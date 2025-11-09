import { Module } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { LoggerModule } from '../logger/logger.module';
import { ResponseModule } from '../services/response.module';

@Module({
  imports: [LoggerModule, ResponseModule],
  providers: [ProxyService],
  exports: [ProxyService]
})
export class ProxyModule {}
