import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';
import { LoginDataDto } from './dto/loginDataDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() userData: CreateUserDto): Promise<User> {
    return this.usersService.create(userData);
  }

  @Post('login')
  login(@Body() loginData: LoginDataDto) {
    return this.authService.login(loginData);
  }
}
