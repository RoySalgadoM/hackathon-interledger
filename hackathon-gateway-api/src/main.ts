import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Cargar variables de entorno desde .env
// Busca el archivo .env en la raíz del proyecto (tanto en desarrollo como en producción)
const envPath = resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import multipart from '@fastify/multipart';
import { LoggerService } from './common/logger/logger.service';
import { getVersionApp } from './common/utils/status-app.util';
import { FastifyPluginsConfig } from './common/plugins/fastify-plugins.config';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseService } from './common/services/response.service';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  // ✅ Registrar @fastify/multipart
  await app.register(multipart as any, {
    limits: { fileSize: 2 * 1024 * 1024 }
  });

  const configService = app.get(ConfigService);

  const apiPrefix = configService.get('api.context', '/api/v1');
  app.setGlobalPrefix(apiPrefix);

  // Register Fastify plugins
  await FastifyPluginsConfig.registerAllPlugins(app);

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

  // Global filters and interceptors
  const loggerService = app.get(LoggerService);
  const responseService = app.get(ResponseService);
  app.useGlobalFilters(
    new GlobalExceptionFilter(loggerService, responseService)
  );
  app.useGlobalInterceptors(new LoggingInterceptor(loggerService));

  const port = configService.get('port', 3000);
  const host = configService.get('host', 'localhost');

  await app.listen(port, host);

  loggerService.printInfo(
    '----------------------------------------------------------'
  );
  loggerService.printInfo('         API GATEWAY IS RUNNING');
  loggerService.printInfo(`         VERSION: ${getVersionApp()}`);
  loggerService.printInfo(
    `         ENVIRONMENT: ${configService.get('environment', 'development')}`
  );
  loggerService.printInfo(`         HOST: ${host}`);
  loggerService.printInfo(`         PORT: ${port}`);
  loggerService.printInfo(
    `         LOG LEVEL: ${configService.get('logLevel', 'info')}`
  );
  loggerService.printInfo(
    '----------------------------------------------------------'
  );
}

bootstrap().catch((error) => {
  console.error('Error starting application:', error);
  process.exit(1);
});
