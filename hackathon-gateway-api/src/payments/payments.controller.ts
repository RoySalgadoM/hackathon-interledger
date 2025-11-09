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

import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { ApiAuthWithPermissionsEndpoint } from '../common/decorators/api.decorators';

@Controller('payments')
@UseGuards(JwtAuthGuard)
@UseInterceptors(LoggingInterceptor)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('/payment-request')
  @ApiAuthWithPermissionsEndpoint('payments.payment-request')
  async paymentRequest(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply
  ): Promise<void> {
    return this.paymentsService.paymentRequest(request, reply);
  }

  @Get('/payment-verification')
  @ApiAuthWithPermissionsEndpoint('payments.payment-verification')
  async paymentVerification(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply
  ): Promise<void> {
    return this.paymentsService.paymentVerification(request, reply);
  }

  @Get('/callback')
  @Public()
  async paymentCallback(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply
  ): Promise<void> {
    return this.paymentsService.paymentCallback(request, reply);
  }

  @Get('/wallet')
  async getWallets(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply
  ): Promise<void> {
    return this.paymentsService.getWallets(request, reply);
  }
}
