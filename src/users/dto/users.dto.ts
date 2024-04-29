import { IsString, IsNotEmpty, Length, IsEnum } from 'class-validator';
import { UserRole } from 'src/entity-store/entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  username: string;

  @IsNotEmpty()
  @Length(5, 20)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 20)
  contactNumber: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  userRole: UserRole;
}
