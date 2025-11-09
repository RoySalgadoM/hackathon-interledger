import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest, FastifyReply } from 'fastify';

import { ProxyService } from '../proxy/proxy.service';
import { LoggerService } from '../logger/logger.service';

/**
 * Base service with common proxy patterns
 * Reduces boilerplate in all services
 */
@Injectable()
export abstract class BaseService {
  constructor(
    protected readonly configService: ConfigService,
    protected readonly proxyService: ProxyService,
    protected readonly loggerService: LoggerService
  ) {}

  /**
   * Common method to handle proxy requests with logging
   * @param request Fastify request
   * @param reply Fastify reply
   * @param targetUrl Target microservice URL
   * @param serviceName Name of the service for logging
   * @param methodName Name of the method for logging
   */
  protected async handleProxyRequest(
    request: FastifyRequest,
    reply: FastifyReply,
    targetUrl: string,
    serviceName: string,
    methodName: string
  ): Promise<void> {
    this.loggerService.printInfo(`Processing ${methodName} request`);

    this.loggerService.printDebug(`${methodName} target URL: ${targetUrl}`);

    try {
      await this.proxyService.proxyRequest(
        request,
        reply,
        targetUrl,
        serviceName
      );

      this.loggerService.printInfo(
        `${methodName} request processed successfully`
      );
    } catch (error) {
      this.loggerService.printError(
        `${methodName} request failed: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }

  /**
   * Build microservice URL with common patterns
   * @param baseUrl Base URL from config
   * @param endpoint Endpoint path
   * @returns Complete URL
   */
  protected buildMicroserviceUrl(baseUrl: string, endpoint: string): string {
    const cleanBaseUrl = baseUrl.replace(/\/$/, '');
    const cleanEndpoint = endpoint.replace(/^\//, '');
    return `${cleanBaseUrl}/${cleanEndpoint}`;
  }
}
