import { UserRepository } from './user.repository';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(userRepository).toBeDefined();
    });
  });

  describe('fetchUserAndVerifyPassword method', () => {
    it('should call fetchUserAndVerifyPassword method successfully', () => {});
  });

  describe('registerUser method', () => {
    it('should call registerUser method successfully', () => {});

    it('should return registred user successfully', async () => {});
  });

  describe('hashPassword method', () => {
    it('should call hashPassword method successfully', () => {});

    it('should return user by its id successfully', async () => {});
  });
});
