import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from '../schemas/activity.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { ReportType, ReportTypeSchema } from '../schemas/report-type';
import { ActivityService } from './activity.service';
import { ActivityLoggingInterceptor } from '../interceptors/activity-logging.interceptor';
import { LoggerModule } from '../logger/logger.module';
import { ExcelService } from './excel.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
      { name: User.name, schema: UserSchema },
      { name: ReportType.name, schema: ReportTypeSchema }
    ]),
    LoggerModule
  ],
  providers: [ActivityService, ActivityLoggingInterceptor, ExcelService],
  exports: [ActivityService, ActivityLoggingInterceptor, MongooseModule]
})
export class ActivityModule {}
