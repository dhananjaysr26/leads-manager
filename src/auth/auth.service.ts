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
    const userWithUserName = await this.userService.getUserByUserDetails({
      username,
    });
    if (userWithUserName) {
      throw new BadRequestException(
        `User already exist with this userName: ${username}`,
      );
    }
    const userWithPhoneNumber = await this.userService.getUserByUserDetails({
      contactNumber,
    });
    // console.log({ payload, user });
    if (userWithPhoneNumber) {
      throw new BadRequestException(
        `User already exist with this phone Number: ${contactNumber}`,
      );
    }
    return this.userService.createUser(payload);
  }

  async signInUser({ password, username }: SignInUserDto) {
    const user = await this.userService.getUserByUserDetails({
      username,
    });
    if (!user) {
      throw new NotFoundException(`User Not Found with UserName: ${username}`);
    }
    const { password: userPassword, ...restUserDetails } = user;

    if (userPassword !== password) {
      throw new ForbiddenException(`Invalid User Credentials!`);
    }

    const secretToken = this.jwtService.sign(restUserDetails);
    return { user: restUserDetails, secretToken };
  }

  async getAuthUserData(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.getUserByUserDetails({
      userId: id,
    });
    return user;
  }
}
