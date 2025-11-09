import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UserDataMiddleware } from './user-data.middleware';

@Module({
  providers: [UserDataMiddleware],
  exports: [UserDataMiddleware]
})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserDataMiddleware).forRoutes('*');
  }
}
