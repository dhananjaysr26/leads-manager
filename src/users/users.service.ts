import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';
import { User } from 'src/entity-store/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createUser(user: CreateUserDto) {
    // console.log({ user, User });
    try {
      await this.userRepo
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(user)
        .execute();
      return 'User Created!';
    } catch (error) {
      console.error('Error while Creating User', error);
      throw new HttpException('User Creation Failed!', HttpStatus.FORBIDDEN);
    }
  }
  // this will return user by email,id,phoneNumber
  async getUserByUserDetails(details: Partial<User>): Promise<User> {
    const user = await this.userRepo.findOne({ where: details });
    return user;
  }
}
