import {
  Controller,
  Get,
  Query,
  Req,
  Res,
  UseInterceptors
} from '@nestjs/common';
import type { AuthenticatedFastifyRequest } from '../types/fastify-request';

import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { Public } from '@/common/decorators/public.decorator';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { ActivityLoggingInterceptor } from '@/common/interceptors/activity-logging.interceptor';
import { LogActivity } from '@/common/decorators/log-activity.decorator';
import {
  CreatePaymentDto,
  PaymentCallbackDto,
  PaymentVerificationDto
} from './dto/payments.dto';
import { FastifyReply } from 'fastify';

@ApiTags('Payments')
@Controller('payments')
@UseInterceptors(LoggingInterceptor, ActivityLoggingInterceptor)
@LogActivity({
  module: {
    es: 'Pagos',
    en: 'Payments'
  },
  submodule: {
    es: 'Pagos',
    en: 'Payments'
  }
})
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('payment-request')
  @ApiOperation({ summary: 'Create a new payment' })
  @LogActivity({
    description: {
      es: 'Crear un nuevo pago',
      en: 'Create a new payment'
    }
  })
  async createPayment(
    @Query() createPaymentDto: CreatePaymentDto,
    @Req() request: AuthenticatedFastifyRequest,
    @Res() response: FastifyReply
  ) {
    return await this.paymentsService.createPayment(
      createPaymentDto,
      request,
      response
    );
  }

  @Get('payment-verification')
  @ApiOperation({ summary: 'Verify a payment' })
  @LogActivity({
    description: {
      es: 'Verificar un pago',
      en: 'Verify a payment'
    }
  })
  async paymentVerification(
    @Query() paymentVerificationDto: PaymentVerificationDto,
    @Req() request: AuthenticatedFastifyRequest
  ) {
    return await this.paymentsService.paymentVerification(
      paymentVerificationDto,
      request
    );
  }

  @Get('callback')
  @ApiOperation({ summary: 'Create a new payment' })
  @Public()
  @LogActivity({
    description: {
      es: 'Crear un nuevo pago',
      en: 'Create a new payment'
    }
  })
  async paymentCallback(
    @Query() paymentCallbackDto: PaymentCallbackDto,
    @Req() request: AuthenticatedFastifyRequest,
    @Res() response: FastifyReply
  ) {
    return await this.paymentsService.paymentCallback(
      paymentCallbackDto,
      request,
      response
    );
  }

  @Get('wallet')
  @ApiOperation({ summary: 'Get wallet' })
  @LogActivity({
    description: {
      es: 'Obtener wallet',
      en: 'Get wallet'
    }
  })
  async getWallet(@Req() request: AuthenticatedFastifyRequest) {
    return await this.paymentsService.getWallet(request);
  }
}
