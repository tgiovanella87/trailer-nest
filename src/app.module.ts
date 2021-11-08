import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TmdbModule } from './tmdb/tmdb.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [TmdbModule, ConfigModule.forRoot(), MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
