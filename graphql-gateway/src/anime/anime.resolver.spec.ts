import { UserService } from './../user/user.service';
import { AnimeInput } from './input/anime.input';
import { User } from './../user/user.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { AllowedCategories } from './../common/category.enum';
import { AnimeService } from './anime.service';
import { MovieService } from './../movie/movie.service';
import { AnimeResolver } from './anime.resolver';
import { Test, TestingModule } from '@nestjs/testing';

describe('AnimeResolver', () => {
  let animeResolver: AnimeResolver;
  let animeService: AnimeService;
  let movieService: MovieService;
  let userService: UserService;

  const mockAnimeRecord = {
    id: 1,
    title: 'title',
    synopsis: 'synopsis',
    genre: [AllowedCategories.ACTION],
    ranked: 1,
    userId: 0,
    score: 2.2,
    episodes: 10,
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  };

  const mockedUser = {
    id: mockAnimeRecord.userId,
  };

  const mockedAnimeService = {
    getAllAnimes: jest.fn(),
    getAllAnimesOfUser: jest.fn(),
    registerAnime: jest.fn(),
  };

  const mockedMovieService = {
    registerMovie: jest.fn(),
  };

  const mockedUserService = {
    getUserById: jest.fn().mockReturnValue(mockedUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimeResolver, AnimeService, MovieService, UserService],
    })
      .overrideProvider(AnimeService)
      .useValue(mockedAnimeService)
      .overrideProvider(MovieService)
      .useValue(mockedMovieService)
      .overrideProvider(UserService)
      .useValue(mockedUserService)
      .compile();

    animeResolver = module.get<AnimeResolver>(AnimeResolver);
    animeService = module.get<AnimeService>(AnimeService);
    movieService = module.get<MovieService>(MovieService);
    userService = module.get<UserService>(UserService);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(animeResolver).toBeDefined();
      expect(animeService).toBeDefined();
      expect(movieService).toBeDefined();
      expect(userService).toBeDefined();
    });
  });

  describe('getAllAnimes method', () => {
    it('should call getAllAnimes method successfully', () => {
      mockedAnimeService.getAllAnimes = jest
        .fn()
        .mockResolvedValue([mockAnimeRecord]);
      animeResolver.getAllAnimes();
      expect(animeService.getAllAnimes).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException if service getAllAnimes call crushes', async () => {
      mockedAnimeService.getAllAnimes = jest
        .fn()
        .mockRejectedValue(InternalServerErrorException);
      await expect(animeResolver.getAllAnimes()).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should return anime list successfully', async () => {
      mockedAnimeService.getAllAnimes = jest
        .fn()
        .mockResolvedValue([mockAnimeRecord]);
      const animeList = await animeResolver.getAllAnimes();
      expect(animeList).toEqual([mockAnimeRecord]);
    });
  });

  describe('getAllAnimesOfUser method', () => {
    const mockedUser: User = {
      id: 2,
      firstName: 'Jhon',
      lastName: 'Doe',
      birth: new Date(),
      email: 'Jhon.Doe@email.com',
      created_at: new Date(),
      updated_at: undefined,
    };
    it('should call getAllAnimesOfUser method successfully', () => {
      mockedAnimeService.getAllAnimesOfUser = jest
        .fn()
        .mockResolvedValue([mockAnimeRecord]);
      animeResolver.getAllAnimesOfUser(mockedUser);
      expect(animeService.getAllAnimesOfUser).toHaveBeenCalledWith(
        mockedUser.id,
      );
    });

    it('should throw InternalServerErrorException if service getAllAnimesOfUser call crushes', async () => {
      mockedAnimeService.getAllAnimesOfUser = jest
        .fn()
        .mockRejectedValue(InternalServerErrorException);
      await expect(
        animeResolver.getAllAnimesOfUser(mockedUser),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it('should return anime list successfully', async () => {
      mockedAnimeService.getAllAnimesOfUser = jest
        .fn()
        .mockResolvedValue([mockAnimeRecord]);
      const animeList = await animeResolver.getAllAnimesOfUser(mockedUser);
      expect(animeList).toEqual([mockAnimeRecord]);
    });
  });

  describe('registerAnime method', () => {
    const mockedAnimeInput: AnimeInput = {
      title: 'Naruto',
      synopsis: 'Young Shinobi Story',
      genre: [AllowedCategories.ADVENTURE],
      ranked: 1,
      score: 20,
      episodes: 400,
      IsMovie: false,
      userId: 101,
    };
    it('should call registerAnime method successfully', () => {
      animeResolver.registerAnime(mockedAnimeInput);
      expect(animeService.registerAnime).toHaveBeenCalledWith(mockedAnimeInput);
      expect(movieService.registerMovie).not.toHaveBeenCalledWith(
        mockedAnimeInput,
      );
    });
    it('should call registerAnime and registerMovie methods successfully', () => {
      mockedAnimeInput.IsMovie = true;
      animeResolver.registerAnime(mockedAnimeInput);
      expect(animeService.registerAnime).toHaveBeenCalledWith(mockedAnimeInput);
      expect(movieService.registerMovie).toHaveBeenCalledWith(mockedAnimeInput);
    });
    it('should return true successfully', () => {
      const expectedAck = animeResolver.registerAnime(mockedAnimeInput);
      expect(expectedAck).toBe(true);
    });
    it('should throw InternalServerErrorException if registerAnime method calls crushes', () => {
      mockedAnimeService.registerAnime = jest.fn().mockImplementation(() => {
        throw new InternalServerErrorException();
      });
      expect(() => animeResolver.registerAnime(mockedAnimeInput)).toThrow(
        InternalServerErrorException,
      );
    });
    it('should throw InternalServerErrorException if any of registerMovie method calls crushes', () => {
      mockedAnimeInput.IsMovie = true;
      mockedMovieService.registerMovie = jest.fn().mockImplementation(() => {
        throw new InternalServerErrorException();
      });
      expect(() => animeResolver.registerAnime(mockedAnimeInput)).toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('adder ResolveField method', () => {
    it('should call adder method successfully', () => {
      animeResolver.adder(mockAnimeRecord);
      expect(userService.getUserById).toHaveBeenCalledWith({
        id: mockAnimeRecord.userId,
      });
    });

    it('should return user successfully', async () => {
      const user = await animeResolver.adder(mockAnimeRecord);
      expect(user).toEqual(mockedUser);
    });
  });
});
