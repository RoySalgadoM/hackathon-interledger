import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

import { PreauthService } from './preauth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { ApiAuthWithPermissionsEndpoint } from '../common/decorators/api.decorators';

@Controller('preauth')
@UseGuards(JwtAuthGuard)
@UseInterceptors(LoggingInterceptor)
export class PreauthController {
  constructor(private readonly preauthService: PreauthService) {}

  @Post('/rules')
  @ApiAuthWithPermissionsEndpoint('')
  async login(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply
  ): Promise<void> {
    return this.preauthService.createRule(request, reply);
  }

  @Get('/rules')
  @ApiAuthWithPermissionsEndpoint('')
  async getRules(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply
  ): Promise<void> {
    return this.preauthService.getRules(request, reply);
  }

  @Post('/ruleState')
  @ApiAuthWithPermissionsEndpoint('')
  async updateRule(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply
  ): Promise<void> {
    return this.preauthService.updateRule(request, reply);
  }

  @Post('/evaluate')
  @ApiAuthWithPermissionsEndpoint('')
  async evaluate(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply
  ): Promise<void> {
    return this.preauthService.evaluate(request, reply);
  }
}
