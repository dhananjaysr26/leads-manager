import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/users.service';
import { SignInUserDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signupUser(payload: CreateUserDto) {
    const { contactNumber, username } = payload;
    const user = await this.userService.getUserByUserDetails({
      contactNumber,
    });
    // console.log({ payload, user });
    if (user) {
      throw new BadRequestException(
        `User already exist with this phone Number: ${contactNumber}`,
      );
    }

    const userWithUserName = await this.userService.getUserByUserDetails({
      username,
    });
    if (userWithUserName) {
      throw new BadRequestException(
        `User already exist with this userName: ${username}`,
      );
    }
    return this.userService.createUser(payload);
  }

  async signInUser({ password, username }: SignInUserDto) {
    const { password: userPassword, ...user } =
      await this.userService.getUserByUserDetails({
        username,
      });

    if (!user) {
      throw new NotFoundException(
        `User Not Found with phone Number: ${username}`,
      );
    }

    if (userPassword !== password) {
      throw new ForbiddenException(`Invalid User Credentials!`);
    }
    const secretToken = this.jwtService.sign(user);
    return { user, secretToken };
  }

  async getAuthUserData(id: number) {
    const { password, ...user } = await this.userService.getUserByUserDetails({
      userId: id,
    });
    return user;
  }
}
