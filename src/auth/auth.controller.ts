import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  register(@Body() userData: CreateUserDto) {
    return this.usersService.create(userData);
  }
}
