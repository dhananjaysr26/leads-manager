import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userName: string, password: string) {
    const user = await this.authService.signInUser({
      username: userName,
      password,
    });

    // console.log('=> Local Strategy', { user });
    return user;
  }
}
