import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthConst } from './constant/auth.constant';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/auth.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller(AuthConst.Auth)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(AuthConst.SignUp)
  async signUpUser(@Body() body: CreateUserDto) {
    return this.authService.signupUser(body);
  }

  @Post(AuthConst.SignIn)
  async signInUser(
    @Body() body: SignInUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { secretToken, user } = await this.authService.signInUser(body);
    // console.log({ secretToken, user });

    res.cookie('auth-cookie', secretToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return user;
  }

  @Get(AuthConst.CheckAuth)
  @UseGuards(JwtAuthGuard)
  async checkAuth(@Request() req) {
    return this.authService.getAuthUserData(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(AuthConst.SignOut)
  async signOut(@Request() req, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth-cookie');
    return {
      message: 'logged out',
    };
  }
}
