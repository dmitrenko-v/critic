import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  register(@Body() userData: CreateUserDto): Promise<User> {
    return this.usersService.create(userData);
  }
}
