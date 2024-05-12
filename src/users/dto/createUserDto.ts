import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  userName: string;

  @IsEmail()
  email: string;

  @MaxLength(30)
  firstName?: string;

  @MaxLength(30)
  secondName?: string;

  @MinLength(8)
  password: string;
}
