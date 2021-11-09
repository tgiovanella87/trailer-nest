import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TmdbService } from './tmdb.service';

describe('Testing TMDB Service that use TMDB Public API', () => {
  let service: TmdbService;

  const THE_ENV = process.env;

  beforeEach(async () => {
    jest.resetModules();
    process.env = { ...THE_ENV };
    delete process.env.NODE_ENV;

    const module: TestingModule = await Test.createTestingModule({
      providers: [TmdbService],
      imports: [ConfigModule.forRoot()],
    }).compile();

    service = module.get<TmdbService>(TmdbService);
  });

  it('Service TMDB should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Shoud have a valid ID on Viapay API responseData', async () => {
    const movieCode = 'tt7711170';
    const returnedData = await service.retrieveIdByMovieCode(movieCode);
    expect(returnedData.data.id).toBeGreaterThan(0);
  });

  it('Should have a not null ID on Viapay API responseData', async () => {
    const movieCode = '';
    const returnedData = await service.retrieveIdByMovieCode(movieCode);
    expect(returnedData.data.id).not.toBeNull();
  });

  it('Shoulld be a success return to All Request', async () => {
    const movieCode = '';
    const returnedData = await service.retrieveIdByMovieCode(movieCode);
    expect(returnedData.data.error).not.toBeTruthy();
  });

  it('Shoulld have a trailer_url on response', async () => {
    const movieID = '509635';
    const returnedData = await service.retrieveMovieTrailer(movieID);
    expect(returnedData.data.trailer_url).not.toBeNull();
  });

  it('Trailer_url is not undefined', async () => {
    const movieID = '509635';
    const returnedData = await service.retrieveMovieTrailer(movieID);
    expect(returnedData.data.trailer_url).not.toBeUndefined();
  });
});
