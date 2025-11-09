import { ApiResponse } from '@nestjs/swagger';
import { createEndpointResponses } from '../../common/schemas/base-response-schemas';

export const GetLoginSuccessResponse = () =>
  ApiResponse({
    status: 302,
    description: 'Redirects to OAuth provider',
    headers: {
      Location: {
        description: 'OAuth provider URL',
        schema: { type: 'string' }
      }
    }
  });
export const GetLoginResponses = () =>
  createEndpointResponses(GetLoginSuccessResponse(), true);
