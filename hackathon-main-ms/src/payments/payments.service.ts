import { Injectable } from '@nestjs/common';
import { PaymentsDatabaseService } from './payments-database.service';
import { CreatePaymentDto } from './dto/payments.dto';
import { ResponseService } from '../common/services/response.service';
import { ApiResponse } from '../common/types/api-response.interface';
import type { AuthenticatedFastifyRequest } from '../types/fastify-request';

import {
  createAuthenticatedClient,
  isFinalizedGrant
} from '@interledger/open-payments';
import fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentsDatabaseService: PaymentsDatabaseService,
    private readonly responseService: ResponseService,
    private readonly configService: ConfigService
  ) {}

  async createPayment(
    createPaymentDto: CreatePaymentDto,
    request: AuthenticatedFastifyRequest
  ): Promise<ApiResponse> {
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
              uri:
                this.configService.get<string>('callbackUrl') +
                '?paymentId=' +
                request.headers['x-request-id'],
              nonce: String(request.headers['x-request-id'])
            }
          }
        }
      );

      return this.responseService.generateResponseOk(
        request,
        outgoingPaymentGrant,
        'Payment created successfully',
        'Payment created successfully'
      );
    } catch (_err) {
      return this.responseService.generateResponseError(
        request,
        'Error in create payment'
      );
    }
  }
}
