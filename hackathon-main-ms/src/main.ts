import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { LoggerService } from './common/logger/logger.service';
import { getVersionApp } from './common/utils/status-app.util';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ResponseService } from './common/services/response.service';
import { ResponseCodeInterceptor } from './common/interceptors/response-code.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false,
      bodyLimit: 52428800
    })
  );

  const configService = app.get(ConfigService);
  const loggerService = app.get(LoggerService);

  const apiPrefix = configService.get('api.context');
  app.setGlobalPrefix(apiPrefix);

  // Register Fastify plugins
  await app.register(require('@fastify/helmet'), {
    contentSecurityPolicy: false
  });
  await app.register(require('@fastify/cors'), {
    origin: true,
    credentials: true
  });

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  app.useGlobalInterceptors(new ResponseCodeInterceptor());

  // Global filters
  const responseService = app.get(ResponseService);
  app.useGlobalFilters(
    new GlobalExceptionFilter(loggerService, responseService)
  );

  const config = new DocumentBuilder()
    .setTitle(configService.get('api.name') || '')
    .setVersion(getVersionApp())
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header'
      },
      'JWT-auth'
    )
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-request-id',
        in: 'header',
        description: 'Unique request identifier (UUID)'
      },
      'x-request-id'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  const port = configService.get('port');
  const host = configService.get('host');

  await app.listen(port, host);

  loggerService.printInfo(
    '----------------------------------------------------------'
  );
  loggerService.printInfo('         ADMINISTRATION API IS RUNNING');
  loggerService.printInfo(`         VERSION: ${getVersionApp()}`);
  loggerService.printInfo(
    `         ENVIRONMENT: ${configService.get('environment')}`
  );
  loggerService.printInfo(`         HOST: ${host}`);
  loggerService.printInfo(`         PORT: ${port}`);
  loggerService.printInfo(
    `         LOG LEVEL: ${configService.get('logLevel')}`
  );
  loggerService.printInfo(
    '----------------------------------------------------------'
  );
}

bootstrap().catch((error) => {
  console.error('Error starting application:', error);
  process.exit(1);
});
