import { UsersController } from './users.controller';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';

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

describe('UserController', () => {
  let controller: UsersController;

  const mockUsersService = {
    findAll: jest.fn(() => users),
    findOne: jest.fn((id) => users.find((user) => user.id === id) || null),
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
    expect(controller.findOne('1')).toEqual(user);
  });

  it('findOne missing user', () => {
    expect(controller.findOne('3')).toBeNull();
  });
});