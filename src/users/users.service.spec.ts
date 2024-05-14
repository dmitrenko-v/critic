import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/createUserDto';
import { ConflictException } from '@nestjs/common';

const users: User[] = [
  {
    id: '1',
    userName: 'userName1',
    firstName: 'firstName1',
    secondName: 'secondName1',
    email: 'email1@gmail.com',
    password: 'password1',
  },
  {
    id: '2',
    userName: 'userName2',
    firstName: 'firstName2',
    secondName: 'secondName2',
    email: 'email2@gmail.com',
    password: 'password2',
  },
];

const user: User = users[0];

const userToCreate: CreateUserDto = {
  userName: 'userName3',
  firstName: 'firstName3',
  email: 'email3@gmail.com',
  password: 'password3',
};

const sameEmailUser: CreateUserDto = {
  userName: 'userName4',
  firstName: 'firstName2',
  secondName: 'secondName2',
  email: 'email2@gmail.com',
  password: 'password2',
};

const sameUsernameUser: CreateUserDto = {
  userName: 'userName2',
  firstName: 'firstName2',
  secondName: 'secondName2',
  email: 'email5@gmail.com',
  password: 'password2',
};

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    find: jest.fn((): User[] => users),
    create: jest.fn((dto: CreateUserDto): CreateUserDto => dto),
    findOneBy: jest.fn(
      (
        where: { userName: string } | { id: string } | { email: string },
      ): User | null =>
        users.find(
          (user) =>
            where[Object.keys(where)[0] as keyof typeof where] ===
            user[Object.keys(where)[0] as keyof User],
        ) || null,
    ),
    save: jest.fn((dto: CreateUserDto) => ({ id: Date.now(), ...dto })),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUsersRepository },
      ],
    }).compile();

    service = moduleRef.get<UsersService>(UsersService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all users', () => {
    expect(service.findAll()).toEqual(users);
  });

  it('findOne existing user', () => {
    expect(service.findOne({ id: '1' })).toEqual(user);
  });

  it('findOne missing user returns null', () => {
    expect(service.findOne({ id: '3' })).toBeNull();
  });

  it('Create user returns dto with id', async () => {
    expect(service.create(userToCreate)).resolves.toEqual({
      id: expect.any(Number),
      ...userToCreate,
      password: expect.anything(),
    });
  });

  it('create user with existing email throws error', async () => {
    expect(service.create(sameEmailUser)).rejects.toThrow(ConflictException);
  });

  it('create user with existing username throws error', async () => {
    expect(service.create(sameUsernameUser)).rejects.toThrow(ConflictException);
  });
});
