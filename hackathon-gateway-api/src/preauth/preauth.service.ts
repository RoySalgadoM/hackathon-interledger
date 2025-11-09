import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest, FastifyReply } from 'fastify';

import { BaseService } from '../common/base/base.service';
import { ProxyService } from '../common/proxy/proxy.service';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class PreauthService extends BaseService {
  constructor(
    configService: ConfigService,
    proxyService: ProxyService,
    loggerService: LoggerService
  ) {
    super(configService, proxyService, loggerService);
  }

  async createRule(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const targetUrl = this.buildMicroserviceUrl(
      this.configService.get('microservices.preauthMsUrl'),
      '/rules'
    );

    return this.handleProxyRequest(
      request,
      reply,
      targetUrl,
      'PreauthService',
      'createRule'
    );
  }

  async getRules(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const targetUrl = this.buildMicroserviceUrl(
      this.configService.get('microservices.preauthMsUrl'),
      '/rules'
    );

    return this.handleProxyRequest(
      request,
      reply,
      targetUrl,
      'PreauthService',
      'getRules'
    );
  }

  async updateRule(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const targetUrl = this.buildMicroserviceUrl(
      this.configService.get('microservices.preauthMsUrl'),
      '/ruleState'
    );

    return this.handleProxyRequest(
      request,
      reply,
      targetUrl,
      'PreauthService',
      'updateRuleState'
    );
  }

  async evaluate(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const targetUrl = this.buildMicroserviceUrl(
      this.configService.get('microservices.preauthMsUrl'),
      '/evaluate'
    );

    return this.handleProxyRequest(
      request,
      reply,
      targetUrl,
      'PreauthService',
      'evaluate'
    );
  }
}
