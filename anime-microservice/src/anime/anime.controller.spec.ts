import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { AllowedCategories } from './categories.enum';
import { Test, TestingModule } from '@nestjs/testing';

describe('AnimeController', () => {
  let animeController: AnimeController;
  let animeService: AnimeService;
  const mockAnimeRecord = {
    id: 1,
    title: 'title',
    synopsis: 'synopsis',
    genre: [AllowedCategories.ACTION],
    ranked: 1,
    score: 2.2,
    userId: 101,
    episodes: 20,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const mockedAnimeService = {
    registerAnime: jest.fn(),
    getAllAnimes: jest.fn().mockResolvedValue([mockAnimeRecord]),
    getAllAnimesOfUser: jest.fn().mockResolvedValue([mockAnimeRecord]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimeController],
      providers: [AnimeService],
    })
      .overrideProvider(AnimeService)
      .useValue(mockedAnimeService)
      .compile();

    animeController = module.get<AnimeController>(AnimeController);
    animeService = module.get<AnimeService>(AnimeService);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(animeController).toBeDefined();
      expect(animeService).toBeDefined();
    });
  });

  describe('registerAnime method', () => {
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
      animeController.registerAnime(registerAnimeDto);
      expect(animeService.registerAnime).toHaveBeenCalledWith(registerAnimeDto);
    });
  });

  describe('getAllAnimes method', () => {
    it('should call getAllAnimes method successfully', () => {
      animeController.getAllAnimes();
      expect(animeService.getAllAnimes).toHaveBeenCalled();
    });

    it('should return animes list successfully', async () => {
      const animes = await animeController.getAllAnimes();
      expect(animes).toEqual([mockAnimeRecord]);
    });
  });

  describe('getAllAnimesOfUser method', () => {
    const userId = 99;

    it('should call getAllAnimesOfUser method successfully', () => {
      animeController.getAllAnimesOfUser(userId);
      expect(animeService.getAllAnimesOfUser).toHaveBeenCalledWith(userId);
    });

    it('should return animes list successfully', async () => {
      const animes = await animeController.getAllAnimesOfUser(userId);
      expect(animes).toEqual([mockAnimeRecord]);
    });
  });
});
