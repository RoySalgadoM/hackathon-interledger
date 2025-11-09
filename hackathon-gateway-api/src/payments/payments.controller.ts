import {
  Controller,
  Get,
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

@Controller('payments')
@UseGuards(JwtAuthGuard)
@UseInterceptors(LoggingInterceptor)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('/payment-request')
  @Public()
  async paymentRequest(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply
  ): Promise<void> {
    return this.paymentsService.paymentRequest(request, reply);
  }
}
