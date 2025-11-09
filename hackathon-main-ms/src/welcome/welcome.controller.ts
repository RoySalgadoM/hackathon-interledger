import { Controller, Get, applyDecorators } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BaseErrorResponses } from '../common/schemas/base-response-schemas';

import { WelcomeService } from './welcome.service';

@ApiTags('Welcome')
@Controller()
export class WelcomeController {
  constructor(private readonly welcomeService: WelcomeService) {}

  @Get()
  @ApiOperation({ summary: 'Get API status and version' })
  @applyDecorators(
    ApiResponse({
      status: 200,
      description: 'API status retrieved successfully',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'API Gateway is running' },
          version: { type: 'string', example: '1.0.0' },
          timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' }
        }
      }
    }),
    BaseErrorResponses()
  )
  getStatus() {
    return this.welcomeService.getStatus();
  }
}
