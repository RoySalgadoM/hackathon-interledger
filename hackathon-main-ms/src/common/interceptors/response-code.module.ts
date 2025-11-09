import { Module } from '@nestjs/common';
import { ResponseCodeInterceptor } from './response-code.interceptor';

@Module({
  providers: [ResponseCodeInterceptor],
  exports: [ResponseCodeInterceptor]
})
export class ResponseCodeModule {}
