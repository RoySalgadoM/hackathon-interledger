import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDatabaseService } from './auth-database.service';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { ResponseService } from '../common/services/response.service';
import { SchemasModule } from '../common/schemas/schemas.module';
import { LoggingModule } from '../common/interceptors/logging.module';
import { ActivityModule } from '../common/services/activity.module';
import { Algorithm } from 'jsonwebtoken';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          algorithm: configService.get<Algorithm>('jwt.algorithm'),
          expiresIn: configService.get<string>('jwt.expiresIn')
        }
      }),
      inject: [ConfigService]
    }),
    SchemasModule,
    LoggingModule,
    ActivityModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthDatabaseService, JwtStrategy, ResponseService],
  exports: [AuthService, JwtStrategy]
})
export class AuthModule {}
