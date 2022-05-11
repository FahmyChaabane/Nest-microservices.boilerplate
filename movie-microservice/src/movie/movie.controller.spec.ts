import { MovieController } from './movie.controller';
import { AllowedCategories } from './categories.enum';
import { MovieService } from './movie.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MovieController', () => {
  let movieController: MovieController;
  let movieService: MovieService;
  const mockMovieRecord = {
    id: 1,
    title: 'title',
    synopsis: 'synopsis',
    genre: [AllowedCategories.ACTION],
    ranked: 1,
    score: 2.2,
    userId: 101,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const mockedMovieService = {
    registerMovie: jest.fn(),
    getAllMovies: jest.fn().mockResolvedValue([mockMovieRecord]),
    getAllMoviesOfUser: jest.fn().mockResolvedValue([mockMovieRecord]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [MovieService],
    })
      .overrideProvider(MovieService)
      .useValue(mockedMovieService)
      .compile();

    movieController = module.get<MovieController>(MovieController);
    movieService = module.get<MovieService>(MovieService);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(movieController).toBeDefined();
      expect(movieService).toBeDefined();
    });
  });

  describe('registerMovie method', () => {
    const registerMovieDto = {
      title: 'title',
      synopsis: 'synopsis',
      genre: [AllowedCategories.ACTION],
      ranked: 1,
      score: 1.2,
      userId: 101,
    };
    it('should call registerMovie method successfully', () => {
      movieController.registerMovie(registerMovieDto);
      expect(movieService.registerMovie).toHaveBeenCalledWith(registerMovieDto);
    });
  });

  describe('getAllMovies method', () => {
    it('should call getAllMovies method successfully', () => {
      movieController.getAllMovies();
      expect(movieService.getAllMovies).toHaveBeenCalled();
    });

    it('should return movies list successfully', async () => {
      const movies = await movieController.getAllMovies();
      expect(movies).toEqual([mockMovieRecord]);
    });
  });

  describe('getAllMoviesOfUser method', () => {
    const userId = 99;

    it('should call getAllMoviesOfUser method successfully', () => {
      movieController.getAllMoviesOfUser(userId);
      expect(movieService.getAllMoviesOfUser).toHaveBeenCalledWith(userId);
    });

    it('should return movies list successfully', async () => {
      const movies = await movieController.getAllMoviesOfUser(userId);
      expect(movies).toEqual([mockMovieRecord]);
    });
  });
});
