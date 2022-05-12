import { GetUserByIdDto } from './dto/getUserById.dto';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  const mockedUser: User = new User();
  mockedUser.id = 1;
  mockedUser.firstName = 'Jhon';
  mockedUser.lastName = 'Doe';
  mockedUser.birth = new Date();
  mockedUser.email = 'Jhon.Doe@email.com';
  mockedUser.created_at = new Date();
  mockedUser.updated_at = new Date();
  const mockedToken = 'XXXXXXXXX';

  const mockedUserService = {
    loginUser: jest.fn().mockReturnValue(mockedToken),
    registerUser: jest.fn().mockResolvedValue(mockedUser),
    getUserById: jest.fn().mockResolvedValue(mockedUser),
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
      email: mockedUser.email,
      password: 'Wxc123..',
    };

    it('should call loginUser method successfully', () => {
      userController.loginUser(loginDto);
      expect(userService.loginUser).toHaveBeenCalledWith(loginDto);
    });

    it('should return a token successfully', async () => {
      const token = await userController.loginUser(loginDto);
      expect(token).toBe(mockedToken);
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
      expect(userService.registerUser).toHaveBeenCalledWith(registerDto);
    });

    it('should return registred user successfully', async () => {
      const user = await userController.registerUser(registerDto);
      expect(user).toEqual(mockedUser);
    });
  });

  describe('getUserById method', () => {
    const getUserByIdDto: GetUserByIdDto = {
      id: mockedUser.id,
    };

    it('should call getUserById method successfully', () => {
      userController.getUserById(getUserByIdDto);
      expect(userService.getUserById).toHaveBeenCalledWith(getUserByIdDto);
    });

    it('should return user by its id successfully', async () => {
      const user = await userController.getUserById(getUserByIdDto);
      expect(user).toEqual(mockedUser);
    });
  });
});
