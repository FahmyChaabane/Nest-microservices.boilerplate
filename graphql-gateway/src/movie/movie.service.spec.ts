import { MovieInput } from './input/movie.input';
import { AllowedCategories } from './../common/category.enum';
import { ClientProxy } from '@nestjs/microservices';
import { movieMicroserviceClientName } from './../config/app.config';
import { MovieService } from './movie.service';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

describe('MovieResolver', () => {
  let movieService: MovieService;
  let rabbit_client: ClientProxy;

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

  const mockedClientProxy = {
    emit: jest.fn(),
    send: jest.fn().mockImplementation(() => of([mockMovieRecord])),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        { provide: movieMicroserviceClientName, useValue: mockedClientProxy },
      ],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
    rabbit_client = module.get<ClientProxy>(movieMicroserviceClientName);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(movieService).toBeDefined();
      expect(rabbit_client).toBeDefined();
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
      movieService.registerMovie(mockedMovieInput);
      expect(rabbit_client.emit).toHaveBeenCalledWith(
        'movie.register',
        mockedMovieInput,
      );
    });
  });
  describe('getAllMovies method', () => {
    it('should call getAllMovies method successfully', () => {
      movieService.getAllMovies();
      expect(rabbit_client.send).toHaveBeenCalledWith('movie.list', {});
    });

    it('should return movie list successfully', async () => {
      const movieList = await movieService.getAllMovies();
      expect(movieList).toEqual([mockMovieRecord]);
    });
  });
  describe('getAllMoviesOfUser method', () => {
    const userId = 99;
    it('should call getAllMoviesOfUser method successfully', () => {
      movieService.getAllMoviesOfUser(userId);
      expect(rabbit_client.send).toHaveBeenCalledWith('movie.list.id', userId);
    });
    it('should return movie list successfully', async () => {
      const movieList = await movieService.getAllMoviesOfUser(userId);
      expect(movieList).toEqual([mockMovieRecord]);
    });
  });
});
