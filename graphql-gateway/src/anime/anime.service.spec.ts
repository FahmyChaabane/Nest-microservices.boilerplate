import { AnimeInput } from './input/anime.input';
import { AllowedCategories } from './../common/category.enum';
import { ClientProxy } from '@nestjs/microservices';
import { animeMicroserviceClientName } from './../config/app.config';
import { AnimeService } from './anime.service';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

describe('AnimeResolver', () => {
  let animeService: AnimeService;
  let rabbit_client: ClientProxy;

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

  const mockedClientProxy = {
    emit: jest.fn(),
    send: jest.fn().mockImplementation(() => of([mockAnimeRecord])),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimeService,
        { provide: animeMicroserviceClientName, useValue: mockedClientProxy },
      ],
    }).compile();

    animeService = module.get<AnimeService>(AnimeService);
    rabbit_client = module.get<ClientProxy>(animeMicroserviceClientName);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(animeService).toBeDefined();
      expect(rabbit_client).toBeDefined();
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
      animeService.registerAnime(mockedAnimeInput);
      expect(rabbit_client.emit).toHaveBeenCalledWith(
        'anime.register',
        mockedAnimeInput,
      );
    });
  });
  describe('getAllAnimes method', () => {
    it('should call getAllAnimes method successfully', () => {
      animeService.getAllAnimes();
      expect(rabbit_client.send).toHaveBeenCalledWith('anime.list', {});
    });

    it('should return anime list successfully', async () => {
      const animeList = await animeService.getAllAnimes();
      expect(animeList).toEqual([mockAnimeRecord]);
    });
  });
  describe('getAllAnimesOfUser method', () => {
    const userId = 99;
    it('should call getAllAnimesOfUser method successfully', () => {
      animeService.getAllAnimesOfUser(userId);
      expect(rabbit_client.send).toHaveBeenCalledWith('anime.list.id', userId);
    });
    it('should return anime list successfully', async () => {
      const animeList = await animeService.getAllAnimesOfUser(userId);
      expect(animeList).toEqual([mockAnimeRecord]);
    });
  });
});
