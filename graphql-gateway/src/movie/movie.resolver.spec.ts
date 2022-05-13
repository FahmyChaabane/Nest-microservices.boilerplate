import { MovieInput } from './input/movie.input';
import { MovieResolver } from './movie.resolver';
import { User } from './../user/user.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { AllowedCategories } from './../common/category.enum';
import { MovieService } from './../movie/movie.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MovieResolver', () => {
  let movieResolver: MovieResolver;
  let movieService: MovieService;

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

  const mockedMovieService = {
    getAllMovies: jest.fn(),
    getAllMoviesOfUser: jest.fn(),
    registerMovie: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieResolver, MovieService],
    })
      .overrideProvider(MovieService)
      .useValue(mockedMovieService)

      .compile();

    movieResolver = module.get<MovieResolver>(MovieResolver);
    movieService = module.get<MovieService>(MovieService);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(movieResolver).toBeDefined();
      expect(movieService).toBeDefined();
    });
  });

  describe('getAllMovies method', () => {
    it('should call getAllMovies method successfully', () => {
      mockedMovieService.getAllMovies = jest
        .fn()
        .mockResolvedValue([mockMovieRecord]);
      movieResolver.getAllMovies();
      expect(movieService.getAllMovies).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException if service getAllMovies call crushes', async () => {
      mockedMovieService.getAllMovies = jest
        .fn()
        .mockRejectedValue(InternalServerErrorException);
      await expect(movieResolver.getAllMovies()).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should return movie list successfully', async () => {
      mockedMovieService.getAllMovies = jest
        .fn()
        .mockResolvedValue([mockMovieRecord]);
      const movieList = await movieResolver.getAllMovies();
      expect(movieList).toEqual([mockMovieRecord]);
    });
  });

  describe('getAllMoviesOfUser method', () => {
    const mockedUser: User = {
      id: 2,
      firstName: 'Jhon',
      lastName: 'Doe',
      birth: new Date(),
      email: 'Jhon.Doe@email.com',
      created_at: new Date(),
      updated_at: undefined,
    };
    it('should call getAllMoviesOfUser method successfully', () => {
      mockedMovieService.getAllMoviesOfUser = jest
        .fn()
        .mockResolvedValue([mockMovieRecord]);
      movieResolver.getAllMoviesOfUser(mockedUser);
      expect(movieService.getAllMoviesOfUser).toHaveBeenCalledWith(
        mockedUser.id,
      );
    });

    it('should throw InternalServerErrorException if service getAllMoviesOfUser call crushes', async () => {
      mockedMovieService.getAllMoviesOfUser = jest
        .fn()
        .mockRejectedValue(InternalServerErrorException);
      await expect(
        movieResolver.getAllMoviesOfUser(mockedUser),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it('should return movie list successfully', async () => {
      mockedMovieService.getAllMoviesOfUser = jest
        .fn()
        .mockResolvedValue([mockMovieRecord]);
      const movieList = await movieResolver.getAllMoviesOfUser(mockedUser);
      expect(movieList).toEqual([mockMovieRecord]);
    });
  });

  describe('registerMovie method', () => {
    const mockedMovieInput: MovieInput = {
      title: 'Naruto',
      synopsis: 'Young Shinobi Story',
      genre: [AllowedCategories.ADVENTURE],
      ranked: 1,
      score: 20,
      userId: 101,
    };
    it('should call registerMovie method successfully', () => {
      movieResolver.registerMovie(mockedMovieInput);
      expect(movieService.registerMovie).toHaveBeenCalledWith(mockedMovieInput);
    });
    it('should return true successfully', () => {
      const expectedAck = movieResolver.registerMovie(mockedMovieInput);
      expect(expectedAck).toBe(true);
    });

    it('should throw InternalServerErrorException if any of registerMovie method calls crushes', () => {
      mockedMovieService.registerMovie = jest.fn().mockImplementation(() => {
        throw new InternalServerErrorException();
      });
      expect(() => movieResolver.registerMovie(mockedMovieInput)).toThrow(
        InternalServerErrorException,
      );
    });
  });
});
