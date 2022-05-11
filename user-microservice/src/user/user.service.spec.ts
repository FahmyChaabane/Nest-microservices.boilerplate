import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository, JwtService],
    })
      .overrideProvider(UserRepository)
      .useValue({})
      .overrideProvider(JwtService)
      .useValue({})
      .compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(userService).toBeDefined();
      expect(userRepository).toBeDefined();
      expect(jwtService).toBeDefined();
    });
  });

  describe('loginUser method', () => {
    it('should call loginUser method successfully', () => {});
  });

  describe('registerUser method', () => {
    it('should call registerUser method successfully', () => {});

    it('should return registred user successfully', async () => {});
  });

  describe('getUserById method', () => {
    it('should call getUserById method successfully', () => {});

    it('should return user by its id successfully', async () => {});
  });
});
