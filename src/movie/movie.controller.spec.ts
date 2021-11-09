import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { ConfigModule } from '@nestjs/config';
import { TmdbService } from '../tmdb/tmdb.service';

describe('Testing the MovieController', () => {
  let controller: MovieController;

  const THE_ENV = process.env;

  beforeEach(async () => {
    jest.resetModules();
    process.env = { ...THE_ENV };
    delete process.env.NODE_ENV;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [MovieService, TmdbService],
      imports: [
        ConfigModule.forRoot(),
        CacheModule.register({
          isGlobal: true,
          ttl: null,
        }),
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should have response for any request', async () => {
    const URL = 'https://content.viaplay.se/pc-se/film/alone-2020';

    expect(controller.retriveMovieTrailerOnGet(URL)).not.toBeNull();
  });

  it('Should fail for bad request', async () => {
    const URL = '';

    expect(controller.retriveMovieTrailerOnGet(URL)).rejects.toThrow();
  });
});
