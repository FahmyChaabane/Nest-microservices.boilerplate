import { AnimeRepository } from './anime.repository';
import { AnimeService } from './anime.service';
import { AllowedCategories } from './categories.enum';
import { Test, TestingModule } from '@nestjs/testing';

describe('AnimeService', () => {
  let animeService: AnimeService;
  let animeRepository: AnimeRepository;
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
  const mockedAnimeRepository = {
    registerAnime: jest.fn(),
    find: jest.fn().mockResolvedValue([mockAnimeRecord]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimeService,
        {
          provide: AnimeRepository,
          useValue: mockedAnimeRepository,
        },
      ],
    }).compile();

    animeService = module.get<AnimeService>(AnimeService);
    animeRepository = module.get<AnimeRepository>(AnimeRepository);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(animeService).toBeDefined();
      expect(animeRepository).toBeDefined();
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
      animeService.registerAnime(registerAnimeDto);
      expect(animeRepository.registerAnime).toHaveBeenCalledWith(
        registerAnimeDto,
      );
    });
  }),
    describe('getAllAnimes method', () => {
      it('should call getAllAnimes method successfully', () => {
        animeService.getAllAnimes();
        expect(animeRepository.find).toHaveBeenCalled();
      });

      it('should return animes list successfully', async () => {
        const animes = await animeService.getAllAnimes();
        expect(animes).toEqual([mockAnimeRecord]);
      });
    });

  describe('getAllAnimesOfUser method', () => {
    const userId = 99;
    const findCriteria = { where: { userId } };

    it('should call getAllAnimesOfUser method successfully', () => {
      animeService.getAllAnimesOfUser(userId);
      expect(animeRepository.find).toHaveBeenCalledWith(findCriteria);
    });

    it('should return animes list successfully', async () => {
      const animes = await animeService.getAllAnimesOfUser(userId);
      expect(animes).toEqual([mockAnimeRecord]);
    });
  });
});
