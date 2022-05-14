import { UnauthorizedException } from '@nestjs/common';
import { User } from './../../dist/user/user.entity.d';
import { ConfigService } from '@nestjs/config';
import { UserService } from './../user/user.service';
import { JwtStrategy } from './jwt.strategy';
import { Test } from '@nestjs/testing';
import { JwtPayload } from './jwtPayload';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userService: UserService;

  const mockedUser: User = {
    id: 102,
    firstName: 'Jhon',
    lastName: 'Doe',
    birth: new Date(),
    email: 'jhon.Doe@email.com',
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockedUserService = {
    getUserById: jest.fn().mockResolvedValue(mockedUser),
  };

  const mockedConfigService = {
    get: jest.fn().mockReturnValue('Arrizebalaga'),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [JwtStrategy, UserService, ConfigService],
    })
      .overrideProvider(UserService)
      .useValue(mockedUserService)
      .overrideProvider(ConfigService)
      .useValue(mockedConfigService)
      .compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    userService = module.get<UserService>(UserService);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(jwtStrategy).toBeDefined();
      expect(userService).toBeDefined();
    });
  });

  describe('validate method', () => {
    const mockedJwtPayload: JwtPayload = {
      id: 10,
      email: 'Jhon.doe@email.com',
    };
    it('should call validate method successfully', () => {
      jwtStrategy.validate(mockedJwtPayload);
      expect(userService.getUserById).toHaveBeenCalledWith({
        id: mockedJwtPayload.id,
      });
    });
    it('should reutrn user successfully', async () => {
      mockedUserService.getUserById = jest.fn().mockResolvedValue(mockedUser);
      const user = await jwtStrategy.validate(mockedJwtPayload);
      expect(user).toEqual(mockedUser);
    });

    it('should throw UnauthorizedException if getUserById method return falsy', async () => {
      mockedUserService.getUserById = jest.fn().mockResolvedValue(null);
      await expect(jwtStrategy.validate(mockedJwtPayload)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if getUserById method crushes', () => {
      mockedUserService.getUserById = jest
        .fn()
        .mockRejectedValue(UnauthorizedException);
      expect(jwtStrategy.validate(mockedJwtPayload)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
