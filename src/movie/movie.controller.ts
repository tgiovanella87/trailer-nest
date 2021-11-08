import { Controller, Post, Body } from '@nestjs/common';
import { MovieService } from './movie.service';
import { TmdbService } from '../tmdb/tmdb.service';

@Controller('movie')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly tmdbService: TmdbService,
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

    const responseData: any = await this.movieService.retrieveMovieData(
      movieName,
    );

    console.info(movieName);

    const viapayMovieData: any = await this.tmdbService.retrieveIdByMovieCode(
      responseData.data.id,
    );

    console.info('movieID', responseData.data.id);

    const trailerData = await this.tmdbService.retrieveMovieTrailer(
      viapayMovieData.data.id,
    );
    console.info('movieData', viapayMovieData.data.id);
    console.info('trailerID', trailerData.data.id);

    return trailerData;
  }
}
