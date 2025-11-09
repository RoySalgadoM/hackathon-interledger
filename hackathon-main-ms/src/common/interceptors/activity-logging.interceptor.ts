import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { ActivityService } from '../services/activity.service';
import {
  ACTIVITY_METADATA_KEY,
  ActivityMetadata
} from '../decorators/log-activity.decorator';
import type { AuthenticatedFastifyRequest } from '../../types/fastify-request';

@Injectable()
export class ActivityLoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly activityService: ActivityService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = context.getHandler();
    const controller = context.getClass();

    const controllerMetadata = this.reflector.get<ActivityMetadata>(
      ACTIVITY_METADATA_KEY,
      controller
    );

    const methodMetadata = this.reflector.get<ActivityMetadata>(
      ACTIVITY_METADATA_KEY,
      method
    );

    if (!controllerMetadata && !methodMetadata) {
      return next.handle();
    }

    const metadata = { ...controllerMetadata, ...methodMetadata };

    return next.handle().pipe(
      tap(async () => {
        await this.logActivity(request, metadata);
      })
    );
  }

  private async logActivity(
    request: AuthenticatedFastifyRequest,
    metadata: ActivityMetadata
  ): Promise<void> {
    try {
      const user = JSON.parse(
        (request.headers['api-key-data'] as string) || '{}'
      );
      if (!user?.userId) {
        return;
      }

      if (!metadata.module) {
        return;
      }

      if (!metadata.submodule) {
        return;
      }

      const action = this.activityService.getActionByHttpMethod(request.method);

      const description = metadata.description || { es: '', en: '' };

      await this.activityService.createActivity({
        userId: user.userId,
        module: metadata.module,
        submodule: metadata.submodule,
        action: action,
        description: description,
        uuid: request.headers['x-request-id'] as string
      });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }
}
