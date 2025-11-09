import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [ExcelService],
  exports: [ExcelService]
})
export class ExcelModule {}
