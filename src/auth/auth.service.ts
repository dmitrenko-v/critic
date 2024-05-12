import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDataDto } from './dto/loginDataDto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(loginDataDto: LoginDataDto) {
    const { userName, password } = loginDataDto;
    const user = await this.usersService.findOne({ userName });
  }
}
