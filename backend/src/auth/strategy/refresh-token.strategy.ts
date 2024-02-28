import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('REFRESH_JWT_SECRET'),
      passReqToCallback: true, // Get back the refresh token
    });
  }

  async validate(req: Request, payload: { sub: string; email: string }) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    return {
      ...payload,
      refreshToken,
    };
  }
}
