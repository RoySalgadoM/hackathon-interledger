import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FastifyReply } from 'fastify';
import { RESPONSE_CODES } from '../constants/response-codes.constants';

@Injectable()
export class ResponseCodeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<FastifyReply>();

    return next.handle().pipe(
      map((data) => {
        if (data && data.code) {
          const httpStatus = this.mapResponseCodeToHttpStatus(data.code);
          response.status(httpStatus);
        }
        return data;
      })
    );
  }

  private mapResponseCodeToHttpStatus(responseCode: string): number {
    switch (responseCode) {
      case RESPONSE_CODES.SUCCESS:
        return HttpStatus.OK;

      case RESPONSE_CODES.CREATED:
        return HttpStatus.CREATED;

      case RESPONSE_CODES.REDIRECT:
        return HttpStatus.FOUND;

      case RESPONSE_CODES.BAD_REQUEST:
        return HttpStatus.BAD_REQUEST;

      case RESPONSE_CODES.UNAUTHORIZED:
        return HttpStatus.UNAUTHORIZED;

      case RESPONSE_CODES.FORBIDDEN:
        return HttpStatus.FORBIDDEN;

      case RESPONSE_CODES.NOT_FOUND:
        return HttpStatus.NOT_FOUND;

      case RESPONSE_CODES.CONFLICT:
        return HttpStatus.CONFLICT;

      case RESPONSE_CODES.INTERNAL_SERVER_ERROR:
        return HttpStatus.INTERNAL_SERVER_ERROR;

      case RESPONSE_CODES.SERVICE_UNAVAILABLE:
        return HttpStatus.SERVICE_UNAVAILABLE;

      case RESPONSE_CODES.GATEWAY_TIMEOUT:
        return HttpStatus.GATEWAY_TIMEOUT;

      case RESPONSE_CODES.FAIL:
      case RESPONSE_CODES.NETWORK_ERROR:
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
