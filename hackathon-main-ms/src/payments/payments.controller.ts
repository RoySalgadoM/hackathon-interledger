import { Controller, Get, Query, Req, UseInterceptors } from '@nestjs/common';
import type { AuthenticatedFastifyRequest } from '../types/fastify-request';

import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { Public } from '@/common/decorators/public.decorator';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { ActivityLoggingInterceptor } from '@/common/interceptors/activity-logging.interceptor';
import { LogActivity } from '@/common/decorators/log-activity.decorator';
import { CreatePaymentDto } from './dto/payments.dto';

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
  @Public()
  @ApiOperation({ summary: 'Create a new payment' })
  @LogActivity({
    description: {
      es: 'Crear un nuevo pago',
      en: 'Create a new payment'
    }
  })
  async createPayment(
    @Query() createPaymentDto: CreatePaymentDto,
    @Req() request: AuthenticatedFastifyRequest
  ) {
    return await this.paymentsService.createPayment(createPaymentDto, request);
  }
}
