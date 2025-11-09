import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ProxyModule } from '../common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule {}
