import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AdministrationModule } from './administration/administration.module';
import { WelcomeModule } from './welcome/welcome.module';
import { LoggerModule } from './common/logger/logger.module';
import { ProxyModule } from './common/proxy/proxy.module';
import { ResponseModule } from './common/services/response.module';
import { ThrottlerGuard } from '@nestjs/throttler';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { RequestIdGuard } from './common/guards/request-id.guard';
import configuration from './config/configuration';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './common/auth/auth.module';
import { PreauthModule } from './preauth/preauth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      expandVariables: true
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100
      }
    ]),
    LoggerModule,
    ProxyModule,
    ResponseModule,
    AuthModule,
    AdministrationModule,
    WelcomeModule,
    PaymentsModule,
    PreauthModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_GUARD,
      useClass: RequestIdGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ]
})
export class AppModule {}
