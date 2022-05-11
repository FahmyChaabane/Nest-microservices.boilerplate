import { AnimeRepository } from './anime.repository';
import { AllowedCategories } from './categories.enum';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('AnimeRepository', () => {
  let animeRepository: AnimeRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimeRepository],
    }).compile();
    animeRepository = module.get<AnimeRepository>(AnimeRepository);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(animeRepository).toBeDefined();
    });
  });

  describe('registerAnime method', () => {
    const save = jest.fn();
    beforeEach(() => {
      animeRepository.create = jest.fn().mockReturnValue({
        save,
      });
    });

    const registerAnimeDto = {
      title: 'title',
      synopsis: 'synopsis',
      genre: [AllowedCategories.ACTION],
      ranked: 1,
      score: 1.2,
      userId: 101,
      episodes: 20,
    };

    it('should call registerAnime method successfully', () => {
      animeRepository.registerAnime(registerAnimeDto);
      expect(animeRepository.create).toHaveBeenCalled();
      expect(save).toHaveBeenCalled();
    });

    it('should call registerAnime method throw ConflictException', () => {
      save.mockRejectedValue({ code: '23505' });
      expect(animeRepository.registerAnime(registerAnimeDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should call registerAnime method throw InternalServerErrorException', () => {
      save.mockRejectedValue({ code: '123456' });
      expect(animeRepository.registerAnime(registerAnimeDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
