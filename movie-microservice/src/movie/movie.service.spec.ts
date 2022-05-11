import { AllowedCategories } from './categories.enum';
import { MovieRepository } from './movie.repository';
import { MovieService } from './movie.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MovieService', () => {
  let movieService: MovieService;
  let movieRepository: MovieRepository;
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
  const mockedMovieRepository = {
    registerMovie: jest.fn(),
    find: jest.fn().mockResolvedValue([mockMovieRecord]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService, MovieRepository],
    })
      .overrideProvider(MovieRepository)
      .useValue(mockedMovieRepository)
      .compile();

    movieService = module.get<MovieService>(MovieService);
    movieRepository = module.get<MovieRepository>(MovieRepository);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(movieService).toBeDefined();
      expect(movieRepository).toBeDefined();
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
      movieService.registerMovie(registerMovieDto);
      expect(movieRepository.registerMovie).toHaveBeenCalledWith(
        registerMovieDto,
      );
    });
  }),
    describe('getAllMovies method', () => {
      it('should call getAllMovies method successfully', () => {
        movieService.getAllMovies();
        expect(movieRepository.find).toHaveBeenCalled();
      });

      it('should return movies list successfully', async () => {
        const movies = await movieService.getAllMovies();
        expect(movies).toEqual([mockMovieRecord]);
      });
    });

  describe('getAllMoviesOfUser method', () => {
    const userId = 99;
    const findCriteria = { where: { userId } };

    it('should call getAllMoviesOfUser method successfully', () => {
      movieService.getAllMoviesOfUser(userId);
      expect(movieRepository.find).toHaveBeenCalledWith(findCriteria);
    });

    it('should return movies list successfully', async () => {
      const movies = await movieService.getAllMoviesOfUser(userId);
      expect(movies).toEqual([mockMovieRecord]);
    });
  });
});
