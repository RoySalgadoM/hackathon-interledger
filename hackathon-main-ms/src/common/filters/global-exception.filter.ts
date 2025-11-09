import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify/types/request';
import type { FastifyReply } from 'fastify/types/reply';

import { LoggerService } from '../logger/logger.service';
import { ResponseService } from '../services/response.service';

/**
 * Global exception filter for consistent error handling
 * Provides standardized error responses across the application
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly responseService: ResponseService
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const reply = ctx.getResponse<FastifyReply>();

    const status = this.getHttpStatus(exception);
    const message = this.getErrorMessage(exception);
    const path = request.url;
    const method = request.method;

    // Ignore Chrome DevTools requests
    if (
      path.includes('.well-known/appspecific/') ||
      path.includes('chrome-extension://') ||
      path.includes('favicon.ico')
    ) {
      return;
    }

    // Log the error
    this.loggerService.printError(
      `${method} ${path} - ${status}: ${message}`,
      exception instanceof Error ? exception.stack : undefined
    );

    // Generate custom API response based on status code
    let apiResponse;
    switch (status) {
      case 400:
        apiResponse = this.responseService.generateResponseBadRequest(
          request,
          this.getUserFriendlyMessage(exception)
        );
        break;
      case 401:
        apiResponse = this.responseService.generateResponseUnauthorized(
          request,
          this.getUserFriendlyMessage(exception)
        );
        break;
      case 403:
        apiResponse = this.responseService.generateResponseForbidden(
          request,
          this.getUserFriendlyMessage(exception)
        );
        break;
      case 404:
        apiResponse = this.responseService.generateResponseNotFound(
          request,
          this.getUserFriendlyMessage(exception)
        );
        break;
      case 409:
        apiResponse = this.responseService.generateResponseConflict(
          request,
          this.getUserFriendlyMessage(exception)
        );
        break;
      case 503:
        apiResponse = this.responseService.generateResponseServiceUnavailable(
          request,
          this.getUserFriendlyMessage(exception)
        );
        break;
      default:
        apiResponse = this.responseService.generateResponseError(
          request,
          this.getUserFriendlyMessage(exception)
        );
    }

    // Send response
    this.responseService.sendResponse(reply, apiResponse);
  }

  private getHttpStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    if (exception instanceof Error) {
      // Handle specific error types
      if (exception.name === 'ValidationError') {
        return HttpStatus.BAD_REQUEST;
      }
      if (exception.name === 'UnauthorizedError') {
        return HttpStatus.UNAUTHORIZED;
      }
      if (exception.name === 'ForbiddenError') {
        return HttpStatus.FORBIDDEN;
      }
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getErrorMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (typeof response === 'string') {
        return response;
      }
      if (typeof response === 'object' && response !== null) {
        return (response as any).message || exception.message;
      }
    }

    if (exception instanceof Error) {
      return exception.message;
    }

    return 'Error del servidor interno';
  }

  private getUserFriendlyMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (typeof response === 'object' && response !== null) {
        const message = (response as any).message;
        if (Array.isArray(message)) {
          return message.join(', ');
        }
        return message || 'Ocurrió un error';
      }
    }

    if (exception instanceof Error) {
      // Return user-friendly messages for common errors
      if (exception.message.includes('ECONNREFUSED')) {
        return 'Servicio temporalmente no disponible';
      }
      if (exception.message.includes('timeout')) {
        return 'Tiempo de espera de la solicitud agotado';
      }
    }

    return 'Ocurrió un error inesperado';
  }
}
