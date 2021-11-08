import { Module, CacheModule } from '@nestjs/common';
import { TmdbService } from './tmdb.service';
import { TmdbController } from './tmdb.controller';

@Module({
  imports: [CacheModule.register()],
  controllers: [TmdbController],
  providers: [TmdbService],
})
export class TmdbModule {}
