import { Injectable } from '@nestjs/common';
import { getVersionApp } from '../common/utils/status-app.util';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class WelcomeService {
  constructor(private readonly loggerService: LoggerService) {}

  getStatus() {
    this.loggerService.printInfo('API status requested');

    const status = {
      message: 'API Gateway is running',
      version: getVersionApp(),
      timestamp: new Date().toISOString()
    };

    this.loggerService.printDebug(
      `API status response: ${JSON.stringify(status)}`
    );

    return status;
  }
}
