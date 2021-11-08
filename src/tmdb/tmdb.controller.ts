import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TmdbService } from './tmdb.service';
import { CreateTmdbDto } from './dto/create-tmdb.dto';
import { UpdateTmdbDto } from './dto/update-imdb.dto';

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
