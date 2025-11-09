import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { RESPONSE_CODES } from '../constants/response-codes.constants';

/**
 * Decoradores base que incluyen automáticamente los errores comunes
 */

// Decorador base que incluye TODOS los errores comunes
export const BaseErrorResponses = () =>
  applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      schema: {
        type: 'object',
        properties: {
          code: { type: 'string', example: RESPONSE_CODES.BAD_REQUEST },
          message: {
            type: 'object',
            properties: {
              title: { type: 'string', example: 'Bad Request' },
              description: { type: 'string', example: 'Invalid input data' }
            }
          },
          request_id: {
            type: 'string',
            example: 'c604f972-0f35-4e95-9200-d36b5b985a9f'
          },
          data: { type: 'object', example: {} }
        }
      }
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
      schema: {
        type: 'object',
        properties: {
          code: { type: 'string', example: RESPONSE_CODES.UNAUTHORIZED },
          message: {
            type: 'object',
            properties: {
              title: { type: 'string', example: 'Unauthorized' },
              description: {
                type: 'string',
                example: 'Authentication required'
              }
            }
          },
          request_id: {
            type: 'string',
            example: 'c604f972-0f35-4e95-9200-d36b5b985a9f'
          },
          data: { type: 'object', example: {} }
        }
      }
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden',
      schema: {
        type: 'object',
        properties: {
          code: { type: 'string', example: RESPONSE_CODES.FORBIDDEN },
          message: {
            type: 'object',
            properties: {
              title: { type: 'string', example: 'Forbidden' },
              description: { type: 'string', example: 'Access denied' }
            }
          },
          request_id: {
            type: 'string',
            example: 'c604f972-0f35-4e95-9200-d36b5b985a9f'
          },
          data: { type: 'object', example: {} }
        }
      }
    }),
    ApiResponse({
      status: 404,
      description: 'Not Found',
      schema: {
        type: 'object',
        properties: {
          code: { type: 'string', example: RESPONSE_CODES.NOT_FOUND },
          message: {
            type: 'object',
            properties: {
              title: { type: 'string', example: 'Not Found' },
              description: { type: 'string', example: 'Resource not found' }
            }
          },
          request_id: {
            type: 'string',
            example: 'c604f972-0f35-4e95-9200-d36b5b985a9f'
          },
          data: { type: 'object', example: {} }
        }
      }
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
      schema: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            example: RESPONSE_CODES.INTERNAL_SERVER_ERROR
          },
          message: {
            type: 'object',
            properties: {
              title: { type: 'string', example: 'Internal Server Error' },
              description: {
                type: 'string',
                example: 'An unexpected error occurred'
              }
            }
          },
          request_id: {
            type: 'string',
            example: 'c604f972-0f35-4e95-9200-d36b5b985a9f'
          },
          data: { type: 'object', example: {} }
        }
      }
    }),
    ApiResponse({
      status: 600,
      description: 'Operation Failed',
      schema: {
        type: 'object',
        properties: {
          code: { type: 'string', example: RESPONSE_CODES.FAIL },
          message: {
            type: 'object',
            properties: {
              title: { type: 'string', example: 'Operation Failed' },
              description: {
                type: 'string',
                example: 'The operation could not be completed'
              }
            }
          },
          request_id: {
            type: 'string',
            example: 'c604f972-0f35-4e95-9200-d36b5b985a9f'
          },
          data: { type: 'object', example: {} }
        }
      }
    })
  );

// Decorador para endpoints públicos (sin autenticación)
export const PublicErrorResponses = () =>
  applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      schema: {
        type: 'object',
        properties: {
          code: { type: 'string', example: RESPONSE_CODES.BAD_REQUEST },
          message: {
            type: 'object',
            properties: {
              title: { type: 'string', example: 'Bad Request' },
              description: { type: 'string', example: 'Invalid input data' }
            }
          },
          request_id: {
            type: 'string',
            example: 'c604f972-0f35-4e95-9200-d36b5b985a9f'
          },
          data: { type: 'object', example: {} }
        }
      }
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
      schema: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            example: RESPONSE_CODES.INTERNAL_SERVER_ERROR
          },
          message: {
            type: 'object',
            properties: {
              title: { type: 'string', example: 'Internal Server Error' },
              description: {
                type: 'string',
                example: 'An unexpected error occurred'
              }
            }
          },
          request_id: {
            type: 'string',
            example: 'c604f972-0f35-4e95-9200-d36b5b985a9f'
          },
          data: { type: 'object', example: {} }
        }
      }
    })
  );

// Función helper para crear decoradores con errores automáticos
export const createEndpointResponses = (
  successResponse: any,
  includeAuth: boolean = true
) => {
  if (includeAuth) {
    return applyDecorators(successResponse, BaseErrorResponses());
  } else {
    return applyDecorators(successResponse, PublicErrorResponses());
  }
};
