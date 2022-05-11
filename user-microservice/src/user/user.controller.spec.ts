import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let mockedUser: User;

  beforeAll(() => {
    mockedUser = new User();
    mockedUser.id = 1;
    mockedUser.firstName = 'Jhon';
    mockedUser.lastName = 'Doe';
    mockedUser.birth = new Date();
    mockedUser.email = 'Jhon.Doe@email.com';
    mockedUser.created_at = new Date();
    mockedUser.updated_at = new Date();
  });

  const mockedUserService = {
    loginUser: jest.fn(),
    registerUser: jest.fn().mockResolvedValue(mockedUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockedUserService)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(userController).toBeDefined();
      expect(userService).toBeDefined();
    });
  });

  describe('loginUser method', () => {
    const loginDto: LoginDto = {
      email: 'Jhon.Doe@email.com',
      password: 'Wxc123..',
    };

    it('should call loginUser method successfully', () => {
      userController.loginUser(loginDto);
      expect(userService.loginUser).toHaveBeenCalled();
    });
  });

  describe('registerUser method', () => {
    const registerDto: RegisterDto = {
      firstName: 'Jhon',
      lastName: 'Doe',
      birth: new Date(),
      email: 'Jhon.Doe@email.com',
      password: 'Wxc123..',
    };
    it('should call registerUser method successfully', () => {
      userController.registerUser(registerDto);
      expect(userService.registerUser).toHaveBeenCalled();
    });

    it('should return registred user successfully', async () => {
      const user = await userController.registerUser(registerDto);
      expect(user).toEqual(mockedUser);
    });
  });

  describe('getUserById method', () => {
    it('should call getUserById method successfully', () => {});

    it('should return user by its id successfully', async () => {});
  });
});
