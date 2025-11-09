import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret') || '',
      algorithms: [configService.get<string>('jwt.algorithm') as never]
    });
  }

  async validate(payload: {
    sub: string;
    email: string;
    userId: string;
    firstName: string;
    lastName: string;
    role: string;
    profileId: string;
    permissions: string[];
    jti: string;
  }) {
    if (!payload.sub || !payload.email) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return {
      userId: payload.userId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      role: payload.role,
      profileId: payload.profileId,
      permissions: payload.permissions || [],
      sub: payload.sub,
      jti: payload.jti
    };
  }
}
