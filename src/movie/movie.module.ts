import { Module, CacheModule } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TmdbService } from '../tmdb/tmdb.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [MovieController],
  providers: [MovieService, TmdbService],
})
export class MovieModule {}
