import { Controller, Get, Query, Req, UseInterceptors } from '@nestjs/common';
import type { AuthenticatedFastifyRequest } from '../types/fastify-request';

import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from '@/common/decorators/public.decorator';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { ActivityLoggingInterceptor } from '@/common/interceptors/activity-logging.interceptor';
import { LogActivity } from '@/common/decorators/log-activity.decorator';
import { GetLoginResponses } from './schemas/auth-response-schema';
import { LoginDto } from './dto/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
@UseInterceptors(LoggingInterceptor, ActivityLoggingInterceptor)
@LogActivity({
  module: {
    es: 'Autenticación',
    en: 'Authentication'
  },
  submodule: {
    es: 'Autenticación',
    en: 'Authentication'
  }
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @Public()
  @ApiOperation({ summary: 'Initiate OAuth login flow' })
  @GetLoginResponses()
  @LogActivity({
    description: {
      es: 'Iniciar flujo de autenticación OAuth',
      en: 'Initiate OAuth authentication flow'
    }
  })
  async login(
    @Query() loginDto: LoginDto,
    @Req() request: AuthenticatedFastifyRequest
  ) {
    return await this.authService.login(loginDto, request);
  }
}
