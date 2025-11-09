import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

import { AdministrationService } from './administration.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';

@Controller('')
@UseGuards(JwtAuthGuard)
@UseInterceptors(LoggingInterceptor)
export class AdministrationController {
  constructor(private readonly administrationService: AdministrationService) {}

  @Get('/administration/auth/login')
  @Public()
  async login(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply
  ): Promise<void> {
    return this.administrationService.login(request, reply);
  }
}
