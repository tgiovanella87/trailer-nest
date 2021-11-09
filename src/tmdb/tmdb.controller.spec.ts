import { Test, TestingModule } from '@nestjs/testing';
import { TmdbController } from './tmdb.controller';
import { TmdbService } from './tmdb.service';
import { ConfigModule } from '@nestjs/config';

describe('testing the TMDB Controller', () => {
  let controller: TmdbController;

  const THE_ENV = process.env;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TmdbController],
      providers: [TmdbService],
      imports: [ConfigModule.forRoot()],
    }).compile();

    jest.resetModules();
    process.env = { ...THE_ENV };
    delete process.env.NODE_ENV;

    controller = module.get<TmdbController>(TmdbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should have a payload to any request', async () => {
    const movieCode = 'tt7711170';
    const returnedData = await controller.findByMovieCode(movieCode);
    expect(returnedData).not.toBeNull();
  });

  it('Should have a payload to any request to findTrailer', async () => {
    const movieID = '509635';
    const returnedData = await controller.findByMovieTrailer(movieID);
    expect(returnedData).not.toBeNull();
  });
});
