import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';
import { throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const controller = context.getClass().name;
    const method = context.getHandler().name;
    const methodName = `${controller}.${method}`;

    const requestId = request.headers['x-request-id'];

    this.loggerService.setUUID(requestId);

    const requestInfo = this.extractRequestInfo(request);

    this.loggerService.printInfo(`START process in ${methodName}`);

    this.loggerService.printDebug(
      `Request Info: ${JSON.stringify(requestInfo, null, 2)}`
    );

    return next.handle().pipe(
      tap((response) => {
        this.loggerService.printInfo(`END process in ${methodName}`);

        this.loggerService.printDebug(
          `Response: ${JSON.stringify(this.sanitizeResponse(response), null, 2)}`
        );
      }),
      catchError((error) => {
        this.loggerService.printError(
          `Error in ${methodName}`,
          error instanceof Error ? error.stack : undefined
        );
        return throwError(() => error);
      })
    );
  }

  private generateRequestId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  private extractRequestInfo(request: any): any {
    return {
      method: request.method,
      url: request.url,
      headers: this.sanitizeHeaders(request.headers),
      query: request.query || {},
      params: request.params || {},
      body: this.sanitizeBody(request.body),
      user: JSON.parse((request.headers['api-key-data'] as string) || '{}')
    };
  }

  private sanitizeHeaders(headers: any): any {
    if (!headers) return {};

    const sanitized = { ...headers };
    // Remover headers sensibles
    delete sanitized.authorization;
    delete sanitized.cookie;
    delete sanitized['x-api-key'];
    return sanitized;
  }

  private sanitizeBody(body: any): any {
    if (!body) return null;

    const sanitized = { ...body };
    // Remover campos sensibles del body
    delete sanitized.password;
    delete sanitized.token;
    delete sanitized.secret;
    return sanitized;
  }

  private sanitizeResponse(response: any): any {
    if (!response) return null;

    // Si es una respuesta de API, extraer solo la data
    if (response && typeof response === 'object' && 'data' in response) {
      return {
        code: response.code,
        message: response.message,
        data: response.data
      };
    }

    return response;
  }
}
