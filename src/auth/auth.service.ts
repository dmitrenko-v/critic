import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDataDto } from './dto/loginDataDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDataDto: LoginDataDto): Promise<{ accessToken: string }> {
    const { userName, password } = loginDataDto;
    const user = await this.usersService.findOne({ userName });

    if (!user) throw new UnauthorizedException();

    const match = await bcrypt.compare(password, user?.password);

    if (!match) throw new UnauthorizedException();

    return {
      accessToken: this.jwtService.sign({ userName }),
    };
  }
}
