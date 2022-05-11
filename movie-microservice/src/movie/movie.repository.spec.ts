import { AllowedCategories } from './categories.enum';
import { MovieRepository } from './movie.repository';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('MovieRepository', () => {
  let movieRepository: MovieRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieRepository],
    }).compile();
    movieRepository = module.get<MovieRepository>(MovieRepository);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(movieRepository).toBeDefined();
    });
  });

  describe('registerMovie method', () => {
    const save = jest.fn();
    beforeEach(() => {
      movieRepository.create = jest.fn().mockReturnValue({
        save,
      });
    });

    const registerMovieDto = {
      title: 'title',
      synopsis: 'synopsis',
      genre: [AllowedCategories.ACTION],
      ranked: 1,
      score: 1.2,
      userId: 101,
    };

    it('should call registerMovie method successfully', () => {
      movieRepository.registerMovie(registerMovieDto);
      expect(movieRepository.create).toHaveBeenCalled();
      expect(save).toHaveBeenCalled();
    });

    it('should call registerMovie method throw ConflictException', () => {
      save.mockRejectedValue({ code: '23505' });
      expect(movieRepository.registerMovie(registerMovieDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should call registerMovie method throw InternalServerErrorException', () => {
      save.mockRejectedValue({ code: '123456' });
      expect(movieRepository.registerMovie(registerMovieDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
