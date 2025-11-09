import { Module } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [LoggingInterceptor],
  exports: [LoggingInterceptor]
})
export class LoggingModule {}
