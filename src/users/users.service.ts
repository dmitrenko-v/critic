import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(where: { id: string } | { userName: string }): Promise<User | null> {
    return this.usersRepository.findOneBy(where);
  }

  async create(userData: CreateUserDto): Promise<User> {
    if (await this.usersRepository.findOneBy({ email: userData.email })) {
      throw new ConflictException('User with given email already exists');
    }

    if (await this.usersRepository.findOneBy({ userName: userData.userName })) {
      throw new ConflictException('User with given username already exists');
    }

    const hashedPassword = await bcrypt.hash(
      userData.password,
      +(process.env.SALT as string | number),
    );

    const user: User = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }
}
