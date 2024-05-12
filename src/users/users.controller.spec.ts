import { UsersController } from './users.controller';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './users.entity';

const users = [
  {
    id: '1',
    userName: 'userName1',
    firstName: 'firstName1',
    email: 'email1@gmail.com',
    password: 'password1',
  },
  {
    id: '2',
    userName: 'userName2',
    firstName: 'firstName2',
    email: 'email2@gmail.com',
    password: 'password2',
  },
];

const user = users[0];

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    findAll: jest.fn((): User[] => users),
    findOne: jest.fn(
      (where: { id: string } | { userName: string }): User | null =>
        users.find((user) => user.id === id) || null,
    ),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = moduleRef.get<UsersController>(UsersController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should return all users', () => {
    expect(controller.findAll()).toEqual(users);
  });

  it('findOne existing user', () => {
    expect(controller.findOne({ id: '3' })).toEqual(user);
  });

  it('findOne missing user returns null', () => {
    expect(controller.findOne({ id: '3' })).toBeNull();
  });
});
