import { AllowedCategories } from './../common/category.enum';
import { User } from './user.entity';
import { MovieService } from './../movie/movie.service';
import { AnimeService } from './../anime/anime.service';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let userService: UserService;
  let animeService: AnimeService;
  let movieService: MovieService;

  const mockedUser: User = {
    id: 102,
    firstName: 'Jhon',
    lastName: 'Doe',
    birth: new Date(),
    email: 'jhon.Doe@email.com',
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockAnimeRecord = {
    id: 1,
    title: 'title',
    synopsis: 'synopsis',
    genre: [AllowedCategories.ACTION],
    ranked: 1,
    score: 2.2,
    episodes: 10,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockMovieRecord = {
    id: 1,
    title: 'title',
    synopsis: 'synopsis',
    genre: [AllowedCategories.ACTION],
    ranked: 1,
    score: 2.2,
    episodes: 10,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockedUserService = {
    getUserById: jest.fn().mockReturnValue(mockedUser),
  };
  const mockedAnimeService = {
    getAllAnimesOfUser: jest.fn().mockReturnValue([mockAnimeRecord]),
  };
  const mockedMovieService = {
    getAllMoviesOfUser: jest.fn().mockReturnValue([mockMovieRecord]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService, AnimeService, MovieService],
    })
      .overrideProvider(UserService)
      .useValue(mockedUserService)
      .overrideProvider(AnimeService)
      .useValue(mockedAnimeService)
      .overrideProvider(MovieService)
      .useValue(mockedMovieService)
      .compile();

    userResolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
    animeService = module.get<AnimeService>(AnimeService);
    movieService = module.get<MovieService>(MovieService);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(userResolver).toBeDefined();
      expect(userService).toBeDefined();
      expect(animeService).toBeDefined();
      expect(movieService).toBeDefined();
    });
  });

  describe('getUserById method', () => {
    it('should call getUserById method successfully', () => {
      userResolver.getUserById(mockedUser);
      expect(userService.getUserById).toHaveBeenCalledWith({
        id: mockedUser.id,
      });
    });
    it('should return user successfully', async () => {
      const user = await userResolver.getUserById(mockedUser);
      expect(user).toEqual(mockedUser);
    });
  });

  describe('movies ResolveField method', () => {
    it('should call movies method successfully', () => {
      userResolver.movies(mockedUser);
      expect(movieService.getAllMoviesOfUser).toHaveBeenCalledWith(
        mockedUser.id,
      );
    });
    it('should return list movies successfully', async () => {
      const movies = await userResolver.movies(mockedUser);
      expect(movies).toEqual([mockMovieRecord]);
    });
  });

  describe('animes ResolveField method', () => {
    it('should call animes method successfully', () => {
      userResolver.animes(mockedUser);
      expect(animeService.getAllAnimesOfUser).toHaveBeenCalledWith(
        mockedUser.id,
      );
    });
    it('should return list animes successfully', async () => {
      const animes = await userResolver.animes(mockedUser);
      expect(animes).toEqual([mockAnimeRecord]);
    });
  });
});
