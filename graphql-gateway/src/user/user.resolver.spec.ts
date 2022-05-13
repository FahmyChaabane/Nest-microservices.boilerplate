import { UserResolver } from './user.resolver';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserResolver', () => {
  let userResolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver],
    }).compile();

    userResolver = module.get<UserResolver>(UserResolver);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(userResolver).toBeDefined();
    });
  });

  describe('loginUser method', () => {
    it('should call loginUser method successfully', () => {});
  });
});
