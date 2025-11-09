import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RequestIdGuard } from './common/guards/request-id.guard';

import { WelcomeModule } from './welcome/welcome.module';
import { LoggerModule } from './common/logger/logger.module';
import { ResponseModule } from './common/services/response.module';
import { ActivityModule } from './common/services/activity.module';
import { MiddlewareModule } from './common/middleware/middleware.module';
import configuration from './config/configuration';
import { ExcelService } from './common/services/excel.service';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      expandVariables: true
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.uri'),
        family: 4
      }),
      inject: [ConfigService]
    }),
    LoggerModule,
    ResponseModule,
    ActivityModule,
    MiddlewareModule,
    WelcomeModule,
    AuthModule,
    PaymentsModule
  ],
  providers: [
    ExcelService,
    {
      provide: APP_GUARD,
      useClass: RequestIdGuard
    }
  ]
})
export class AppModule {}
