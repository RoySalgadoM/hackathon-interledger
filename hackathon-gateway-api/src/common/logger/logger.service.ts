import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;
  private requestId: string;
  private version: string;

  constructor(private configService: ConfigService) {
    this.version = this.getVersion();
    const logFormat = this.configService.get<string>('logFormat') || 'raw';

    this.logger = winston.createLogger({
      level: this.configService.get<string>('logLevel'),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      transports: [
        new winston.transports.File({
          filename: 'logs/api-gateway.log'
        }),
        new winston.transports.Console({
          format: this.getConsoleFormat(logFormat)
        })
      ]
    });
  }

  setUUID(uuid?: string): void {
    this.requestId = uuid || uuidv4();
  }

  getUUID(): string {
    return this.requestId;
  }

  private getVersion(): string {
    try {
      const packagePath = path.join(process.cwd(), 'package.json');
      const packageContent = fs.readFileSync(packagePath, 'utf8');
      const packageJson = JSON.parse(packageContent);
      return packageJson.version || '1.0.0';
    } catch (_error) {
      return '1.0.0';
    }
  }

  private getConsoleFormat(format: string): winston.Logform.Format {
    if (format === 'json') {
      return winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      );
    } else {
      // Formato raw (desarrollo)
      return winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        winston.format.colorize(),
        winston.format.printf(
          ({
            timestamp,
            level,
            message,
            requestId,
            service,
            method,
            version,
            type
          }) => {
            const requestIdStr = requestId ? ` :: ${requestId}` : '';
            const serviceStr = service ? ` [${service}]` : '';
            const methodStr = method ? `:${method}` : '';
            const versionStr = version ? ` v${version}` : '';
            const typeStr = type ? ` [${type}]` : '';

            return `[ ${timestamp} | ${level}${versionStr} ]${serviceStr}${methodStr}${typeStr}${requestIdStr} :: ${message}`;
          }
        )
      );
    }
  }

  private log(message: string, context?: string): void {
    this.logger.info(message, {
      context,
      requestId: this.requestId,
      service: 'LoggerService',
      version: this.version
    });
  }

  private info(message: string, context?: string): void {
    this.logger.info(message, {
      context,
      requestId: this.requestId,
      service: 'LoggerService',
      version: this.version
    });
  }

  private error(message: string, trace?: string, context?: string): void {
    this.logger.error(message, {
      trace,
      context,
      requestId: this.requestId,
      service: 'LoggerService',
      version: this.version
    });
  }

  private warn(message: string, context?: string): void {
    this.logger.warn(message, {
      context,
      requestId: this.requestId,
      service: 'LoggerService',
      version: this.version
    });
  }

  private debug(message: string, context?: string): void {
    this.logger.debug(message, {
      context,
      requestId: this.requestId,
      service: 'LoggerService',
      version: this.version
    });
  }

  printDebug(message: string): void {
    const context = this.extractContext();
    const [filename, method] = context.split(':');

    this.logger.debug(message, {
      context: `${filename}:${method}`,
      requestId: this.requestId,
      service: filename,
      method: method,
      version: this.version,
      type: 'debug'
    });
  }

  printInfo(message: string): void {
    const context = this.extractContext();
    const [filename, method] = context.split(':');

    this.logger.info(message, {
      context: `${filename}:${method}`,
      requestId: this.requestId,
      service: filename,
      method: method,
      version: this.version,
      type: 'info'
    });
  }

  printError(message: string, trace?: string): void {
    const context = this.extractContext();
    const [filename, method] = context.split(':');

    this.logger.error(message, {
      context: `${filename}:${method}`,
      requestId: this.requestId,
      service: filename,
      method: method,
      version: this.version,
      type: 'error',
      trace: trace
    });
  }

  printWarn(message: string): void {
    const context = this.extractContext();
    const [filename, method] = context.split(':');

    this.logger.warn(message, {
      context: `${filename}:${method}`,
      requestId: this.requestId,
      service: filename,
      method: method,
      version: this.version,
      type: 'warn'
    });
  }

  private extractContext(): string {
    const stack = new Error().stack;
    if (!stack) {
      return 'Unknown:Unknown';
    }

    const lines = stack.split('\n');
    for (let i = 2; i < lines.length; i++) {
      const line = lines[i];
      if (
        line &&
        !line.includes('LoggerService') &&
        !line.includes('node_modules')
      ) {
        const match = line.match(/at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)/);
        if (match) {
          const [, method, filePath, _lineNumber] = match;
          const fileName =
            filePath.split('/').pop()?.split('\\').pop() || 'Unknown';
          const methodName = method.split('.').pop() || 'Unknown';
          return `${fileName}:${methodName}`;
        }
      }
    }

    return 'Unknown:Unknown';
  }
}
