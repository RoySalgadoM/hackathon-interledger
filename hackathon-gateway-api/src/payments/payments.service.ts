import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest, FastifyReply } from 'fastify';

import { BaseService } from '../common/base/base.service';
import { ProxyService } from '../common/proxy/proxy.service';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class PaymentsService extends BaseService {
  constructor(
    configService: ConfigService,
    proxyService: ProxyService,
    loggerService: LoggerService
  ) {
    super(configService, proxyService, loggerService);
  }

  async paymentRequest(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const targetUrl = this.buildMicroserviceUrl(
      this.configService.get('microservices.administrationMsUrl'),
      '/payments/payment-request'
    );

    return this.handleProxyRequest(
      request,
      reply,
      targetUrl,
      'PaymentsService',
      'paymentRequest'
    );
  }
  async paymentVerification(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const targetUrl = this.buildMicroserviceUrl(
      this.configService.get('microservices.administrationMsUrl'),
      '/payments/payment-verification'
    );

    return this.handleProxyRequest(
      request,
      reply,
      targetUrl,
      'PaymentsService',
      'paymentVerification'
    );
  }

  async paymentCallback(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const targetUrl = this.buildMicroserviceUrl(
      this.configService.get('microservices.administrationMsUrl'),
      '/payments/callback'
    );

    return this.handleProxyRequest(
      request,
      reply,
      targetUrl,
      'PaymentsService',
      'paymentCallback'
    );
  }

  async getWallets(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const targetUrl = this.buildMicroserviceUrl(
      this.configService.get('microservices.administrationMsUrl'),
      '/payments/wallets'
    );

    return this.handleProxyRequest(
      request,
      reply,
      targetUrl,
      'PaymentsService',
      'getWallets'
    );
  }
}
