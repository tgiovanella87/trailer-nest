import { Controller, Post, Body, CACHE_MANAGER, Inject } from '@nestjs/common';
import { MovieService } from './movie.service';
import { TmdbService } from '../tmdb/tmdb.service';
import { Cache } from 'cache-manager';

@Controller('movie')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly tmdbService: TmdbService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  async retrieveMovieDataByUrl(@Body() movieData: any) {
    if (movieData.url.lastIndexOf('/') >= movieData.url.length - 1) {
      return {
        error: true,
        message: 'There is no movie name on the informed URL',
      };
    }

    const movieName = movieData.url.substring(
      movieData.url.lastIndexOf('/') + 1,
    );

    const cachedMovie = await this.cacheManager.store.get(`movie_${movieName}`);
    console.info(`movie_${movieName}`, cachedMovie);

    if (cachedMovie) {
      return { error: false, data: cachedMovie };
    }

    const responseData: any = await this.movieService.retrieveMovieData(
      movieName,
    );

    const viapayMovieData: any = await this.tmdbService.retrieveIdByMovieCode(
      responseData.data.id,
    );

    const trailerData = await this.tmdbService.retrieveMovieTrailer(
      viapayMovieData.data.id,
    );

    await this.cacheManager.store.set(`movie_${movieName}`, trailerData.data, {
      ttl: 30000,
    });

    return trailerData;
  }
}
