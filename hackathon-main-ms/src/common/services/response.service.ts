import { Injectable } from '@nestjs/common';
import type { FastifyRequest } from 'fastify/types/request';
import type { FastifyReply } from 'fastify/types/reply';

import { ApiResponse } from '../types/api-response.interface';
import {
  RESPONSE_CODES,
  RESPONSE_MESSAGES
} from '../constants/response-codes.constants';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class ResponseService {
  constructor(private readonly loggerService: LoggerService) {}

  /**
   * Generate success response
   */
  generateResponseOk(
    request: FastifyRequest,
    responseData: object = {},
    title: string = 'OK',
    description: string = RESPONSE_MESSAGES.SUCCESS
  ): ApiResponse {
    const requestId = this.getRequestId(request);

    return {
      message: {
        title: title,
        description: description
      },
      code: RESPONSE_CODES.SUCCESS,
      request_id: requestId,
      data: responseData
    };
  }

  /**
   * Generate bad request response (400)
   */
  generateResponseBadRequest(
    request: FastifyRequest,
    title: string = 'Bad Request',
    description: string = RESPONSE_MESSAGES.BAD_REQUEST
  ): ApiResponse {
    const requestId = this.getRequestId(request);

    return {
      message: {
        title: title,
        description: description
      },
      code: RESPONSE_CODES.BAD_REQUEST,
      request_id: requestId,
      data: {}
    };
  }

  /**
   * Generate unauthorized response (401)
   */
  generateResponseUnauthorized(
    request: FastifyRequest,
    title: string = 'Unauthorized',
    description: string = RESPONSE_MESSAGES.UNAUTHORIZED
  ): ApiResponse {
    const requestId = this.getRequestId(request);

    return {
      message: {
        title: title,
        description: description
      },
      code: RESPONSE_CODES.UNAUTHORIZED,
      request_id: requestId,
      data: {}
    };
  }

  /**
   * Generate forbidden response (403)
   */
  generateResponseForbidden(
    request: FastifyRequest,
    title: string = 'Forbidden',
    description: string = RESPONSE_MESSAGES.FORBIDDEN
  ): ApiResponse {
    const requestId = this.getRequestId(request);

    return {
      message: {
        title: title,
        description: description
      },
      code: RESPONSE_CODES.FORBIDDEN,
      request_id: requestId,
      data: {}
    };
  }

  /**
   * Generate not found response (404)
   */
  generateResponseNotFound(
    request: FastifyRequest,
    title: string = 'Not Found',
    description: string = RESPONSE_MESSAGES.NOT_FOUND
  ): ApiResponse {
    const requestId = this.getRequestId(request);

    return {
      message: {
        title: title,
        description: description
      },
      code: RESPONSE_CODES.NOT_FOUND,
      request_id: requestId,
      data: {}
    };
  }

  /**
   * Generate conflict response (409)
   */
  generateResponseConflict(
    request: FastifyRequest,
    title: string = 'Conflict',
    description: string = RESPONSE_MESSAGES.CONFLICT
  ): ApiResponse {
    const requestId = this.getRequestId(request);

    return {
      message: {
        title: title,
        description: description
      },
      code: RESPONSE_CODES.CONFLICT,
      request_id: requestId,
      data: {}
    };
  }

  /**
   * Generate service unavailable response (503)
   */
  generateResponseServiceUnavailable(
    request: FastifyRequest,
    title: string = 'Service Unavailable',
    description: string = RESPONSE_MESSAGES.SERVICE_UNAVAILABLE
  ): ApiResponse {
    const requestId = this.getRequestId(request);

    return {
      message: {
        title: title,
        description: description
      },
      code: RESPONSE_CODES.SERVICE_UNAVAILABLE,
      request_id: requestId,
      data: {}
    };
  }

  /**
   * Generate network error response (599)
   */
  generateResponseNetworkError(
    request: FastifyRequest,
    title: string = 'Network Error',
    description: string = RESPONSE_MESSAGES.NETWORK_ERROR
  ): ApiResponse {
    const requestId = this.getRequestId(request);

    return {
      message: {
        title: title,
        description: description
      },
      code: RESPONSE_CODES.NETWORK_ERROR,
      request_id: requestId,
      data: {}
    };
  }

  /**
   * Generate internal server error response (500)
   */
  generateResponseError(
    request: FastifyRequest,
    title: string = 'Internal Server Error',
    description: string = RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
  ): ApiResponse {
    const requestId = this.getRequestId(request);

    return {
      message: {
        title: title,
        description: description
      },
      code: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
      request_id: requestId,
      data: {}
    };
  }

  /**
   * Send response with proper status code
   */
  sendResponse(reply: FastifyReply, apiResponse: ApiResponse): void {
    // Map custom codes to HTTP status codes
    const httpStatusMap = {
      [RESPONSE_CODES.SUCCESS]: 200,
      [RESPONSE_CODES.BAD_REQUEST]: 400,
      [RESPONSE_CODES.UNAUTHORIZED]: 401,
      [RESPONSE_CODES.FORBIDDEN]: 403,
      [RESPONSE_CODES.NOT_FOUND]: 404,
      [RESPONSE_CODES.CONFLICT]: 409,
      [RESPONSE_CODES.INTERNAL_SERVER_ERROR]: 500,
      [RESPONSE_CODES.SERVICE_UNAVAILABLE]: 503,
      [RESPONSE_CODES.GATEWAY_TIMEOUT]: 504,
      [RESPONSE_CODES.NETWORK_ERROR]: 599,
      [RESPONSE_CODES.REDIRECT]: 302
    };

    const httpStatus =
      httpStatusMap[apiResponse.code as keyof typeof httpStatusMap] || 500;
    reply.status(httpStatus).send(apiResponse);
  }

  /**
   * Get request ID from headers or generate new one
   */
  public getRequestId(request: FastifyRequest): string {
    const requestId = request.headers['x-request-id'] as string;
    this.loggerService.setUUID(requestId);
    return requestId;
  }
}
