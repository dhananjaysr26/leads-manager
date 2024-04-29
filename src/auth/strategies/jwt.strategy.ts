import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const authToken = request.cookies['auth-cookie'];
          // console.log('Received token:', authToken, process.env.JWT_SECRET);
          return authToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload: any) {
    // console.log('In the JwtStrategy validate method!', { payload });
    return payload;
  }
}
