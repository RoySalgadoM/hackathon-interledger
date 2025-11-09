import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDatabaseService } from './auth-database.service';
import { LoginDto } from './dto/auth.dto';
import * as crypto from 'crypto';
import { ResponseService } from '../common/services/response.service';
import { ApiResponse } from '../common/types/api-response.interface';
import type { AuthenticatedFastifyRequest } from '../types/fastify-request';
import { UserDocument } from '../common/schemas/user.schema';
import { Algorithm } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly authDatabaseService: AuthDatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly responseService: ResponseService
  ) {}

  async login(
    loginDto: LoginDto,
    request: AuthenticatedFastifyRequest
  ): Promise<ApiResponse> {
    try {
      const user = await this.authDatabaseService.getUserByEmail(
        loginDto.email
      );

      if (user.length === 0) {
        return this.responseService.generateResponseNotFound(
          request,
          'User not found'
        );
      }

      const userData = user[0] as UserDocument;
      const jti = crypto.randomBytes(16).toString('hex');
      const jwtAud = this.configService.get<string>('jwt.audience');
      const jwtIss = this.configService.get<string>('jwt.issuer');
      const maxTokenAge = this.configService.get<string>('jwt.expiresIn');

      const customPayload = {
        userId: userData._id!,
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: loginDto.email,
        iat: Math.floor(Date.now() / 1000),
        jti: jti,
        aud: jwtAud,
        iss: jwtIss
      };

      const customToken = this.jwtService.sign(customPayload, {
        secret: this.configService.get<string>('jwt.secret'),
        algorithm: this.configService.get<Algorithm>('jwt.algorithm'),
        expiresIn: maxTokenAge
      });

      await this.authDatabaseService.updateUserLastAccessDate(
        userData._id!.toString(),
        new Date()
      );

      let successResponse = {
        token: customToken,
        name: `${userData.first_name} ${userData.last_name}`,
        email: loginDto.email
      };

      return this.responseService.generateResponseOk(
        request,
        successResponse,
        'Login successful',
        'Login successful'
      );
    } catch (_err) {
      return this.responseService.generateResponseError(
        request,
        'Error in login'
      );
    }
  }
}
