import { Injectable } from '@nestjs/common';
import { PaymentsDatabaseService } from './payments-database.service';
import { CreatePaymentDto, PaymentCallbackDto } from './dto/payments.dto';
import { ResponseService } from '../common/services/response.service';
import { ApiResponse } from '../common/types/api-response.interface';
import type { AuthenticatedFastifyRequest } from '../types/fastify-request';
import { LoggerService } from '../common/logger/logger.service';

import {
  createAuthenticatedClient,
  isFinalizedGrant
} from '@interledger/open-payments';
import fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { FastifyReply } from 'fastify';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentsDatabaseService: PaymentsDatabaseService,
    private readonly responseService: ResponseService,
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService
  ) {}

  async createPayment(
    createPaymentDto: CreatePaymentDto,
    request: AuthenticatedFastifyRequest,
    response: FastifyReply
  ) {
    try {
      const privateKey = fs.readFileSync('private.key', 'utf-8');

      const client = await createAuthenticatedClient({
        walletAddressUrl: String(createPaymentDto.client_account),
        privateKey: privateKey,
        keyId: '1e25a64e-a93c-4780-96d7-cf4e7b97e6dc',
        requestTimeoutMs: 30000
      });

      const sendingWalletAddress = await client.walletAddress.get({
        url: String(createPaymentDto.client_account)
      });

      const receivingWalletAddress = await client.walletAddress.get({
        url: String(createPaymentDto.merchant_account)
      });

      const incomingPaymentGrant = await client.grant.request(
        { url: receivingWalletAddress.authServer },
        {
          access_token: {
            access: [
              {
                type: 'incoming-payment',
                actions: ['read', 'create']
              }
            ]
          }
        }
      );

      if (!isFinalizedGrant(incomingPaymentGrant)) {
        return this.responseService.generateResponseError(
          request,
          'Grant not finalized'
        );
      }

      let amount =
        createPaymentDto.amount * 10 ** receivingWalletAddress.assetScale;

      const incomingPayment = await client.incomingPayment.create(
        {
          url: receivingWalletAddress.resourceServer,
          accessToken: incomingPaymentGrant.access_token.value
        },
        {
          walletAddress: receivingWalletAddress.id,
          incomingAmount: {
            assetCode: receivingWalletAddress.assetCode,
            assetScale: receivingWalletAddress.assetScale,
            value: String(amount)
          }
        }
      );

      const quouteGrant = await client.grant.request(
        { url: sendingWalletAddress.authServer },
        {
          access_token: {
            access: [
              {
                type: 'quote',
                actions: ['create']
              }
            ]
          }
        }
      );

      if (!isFinalizedGrant(quouteGrant)) {
        return this.responseService.generateResponseError(
          request,
          'Grant not finalized'
        );
      }

      const quote = await client.quote.create(
        {
          url: receivingWalletAddress.resourceServer,
          accessToken: quouteGrant.access_token.value
        },
        {
          walletAddress: sendingWalletAddress.id,
          receiver: incomingPayment.id,
          method: 'ilp'
        }
      );

      const callbackUrl =
        this.configService.get<string>('callbackUrl') +
        '?request_id=' +
        request.headers['x-request-id'];

      const outgoingPaymentGrant = await client.grant.request(
        { url: sendingWalletAddress.authServer },
        {
          access_token: {
            access: [
              {
                type: 'outgoing-payment',
                actions: ['create'],
                limits: {
                  debitAmount: quote.debitAmount
                },
                identifier: sendingWalletAddress.id
              }
            ]
          },
          interact: {
            start: ['redirect'],
            finish: {
              method: 'redirect',
              uri: callbackUrl,
              nonce: String(request.headers['x-request-id'])
            }
          }
        }
      );

      let requestTimestamp = new Date().toISOString();

      const date = new Date(requestTimestamp);
      const year = date.getFullYear().toString().slice(-2);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      let requestTimestampDateFormatted = year + month + day;

      let requestTimestampTimeFormatted =
        date.getHours().toString().padStart(2, '0') +
        date.getMinutes().toString().padStart(2, '0') +
        date.getSeconds().toString().padStart(2, '0');

      const paymentData = {
        client_account: createPaymentDto.client_account,
        merchant_account: createPaymentDto.merchant_account,
        amount: String(amount),
        formatted_amount: createPaymentDto.amount,
        date: requestTimestampDateFormatted,
        time: requestTimestampTimeFormatted,
        request_timestamp: new Date(requestTimestamp),
        response_timestamp: new Date(),
        request_id: String(request.headers['x-request-id'] || ''),
        payment_grant: {
          uri: outgoingPaymentGrant.continue.uri,
          access_token: outgoingPaymentGrant.continue.access_token.value,
          finish: ''
        },
        payment_status: 'pending',
        client_obj: {
          id: sendingWalletAddress.id,
          resource_server: sendingWalletAddress.resourceServer
        },
        quote_id: quote.id
      };

      this.loggerService.printDebug(
        `Attempting to save payment: ${JSON.stringify(paymentData, null, 2)}`
      );

      try {
        const savedPayment =
          await this.paymentsDatabaseService.createPayment(paymentData);
        this.loggerService.printInfo(
          `Payment saved successfully with ID: ${savedPayment._id}`
        );
      } catch (dbError) {
        this.loggerService.printError(
          'Error saving payment to database',
          dbError instanceof Error ? dbError.stack : String(dbError)
        );
        throw dbError;
      }

      response.status(302);
      response.header(
        'Location',
        (outgoingPaymentGrant as any).interact.redirect
      );
      response.send();
    } catch (err) {
      this.loggerService.printError(
        'Error in create payment',
        err instanceof Error ? err.stack : String(err)
      );
      return this.responseService.generateResponseError(
        request,
        err instanceof Error ? err.message : 'Error in create payment'
      );
    }
  }

  async paymentCallback(
    createPaymentDto: PaymentCallbackDto,
    request: AuthenticatedFastifyRequest,
    response: FastifyReply
  ) {
    try {
      const privateKey = fs.readFileSync('private.key', 'utf-8');

      const payment = await this.paymentsDatabaseService.getPayment(
        createPaymentDto.request_id
      );

      if (!payment) {
        return this.responseService.generateResponseError(
          request,
          'Payment not found'
        );
      }

      const client = await createAuthenticatedClient({
        walletAddressUrl: String(payment.client_account),
        privateKey: privateKey,
        keyId: '1e25a64e-a93c-4780-96d7-cf4e7b97e6dc',
        requestTimeoutMs: 30000
      });

      const finalizedOutgoingPaymentGrant = await client.grant.continue(
        {
          url: payment.payment_grant.uri,
          accessToken: payment.payment_grant.access_token
        },
        {
          interact_ref: createPaymentDto.interact_ref
        }
      );

      const outgoingPayment = await client.outgoingPayment.create(
        {
          url: payment.client_obj.resource_server,
          accessToken: (finalizedOutgoingPaymentGrant as any).access_token.value
        },
        {
          walletAddress: payment.client_obj.id,
          quoteId: payment.quote_id,
          metadata: { description: 'Your purchase at Shoe Shop' }
        }
      );

      await this.paymentsDatabaseService.updatePayment(payment.request_id, {
        payment_status: 'completed',
        response_timestamp: new Date()
      });

      let uiSuccessUrl =
        this.configService.get<string>('uiSuccessUrl') +
        '?request_id=' +
        payment.request_id;

      response.status(302);
      response.header('Location', uiSuccessUrl);
      response.send();
    } catch (_err) {
      return this.responseService.generateResponseError(
        request,
        'Error in create payment'
      );
    }
  }

  async getWallets(request: AuthenticatedFastifyRequest) {
    try {
      const privateKey = fs.readFileSync('private.key', 'utf-8');
    } catch (err) {
      this.loggerService.printError(
        'Error in get wallets',
        err instanceof Error ? err.stack : String(err)
      );
    }
  }
}
