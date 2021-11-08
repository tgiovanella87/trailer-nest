import { Controller, Get, Param } from '@nestjs/common';
import { TmdbService } from './tmdb.service';

@Controller('tmdb')
export class TmdbController {
  constructor(private readonly tmdbService: TmdbService) {}

  @Get('movie-id/:movieCode')
  async findByMovieCode(@Param('movieCode') movieCode: string) {
    return await this.tmdbService.retrieveIdByMovieCode(movieCode);
  }

  @Get('movie-trailer/:movieId')
  async findByMovieId(@Param('movieId') movieId: string) {
    return await this.tmdbService.retrieveMovieTrailer(movieId);
  }
}
