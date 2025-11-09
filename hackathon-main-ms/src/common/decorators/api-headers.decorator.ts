import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

/**
 * Decorador que aplica automáticamente:
 * - @ApiBearerAuth('JWT-auth') para autenticación JWT
 * - @ApiHeader para x-request-id
 */
export function ApiAuthHeaders() {
  return applyDecorators(
    ApiBearerAuth('JWT-auth'),
    ApiHeader({
      name: 'x-request-id',
      description: 'Unique request identifier (UUID)',
      required: true,
      example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    ApiHeader({
      name: 'x-api-key',
      description: 'API key',
      required: true,
      example: '123e4567-e89b-12d3-a456-426614174000'
    })
  );
}
