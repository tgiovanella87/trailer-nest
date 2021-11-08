import { Module } from '@nestjs/common';
import { TrailerService } from './trailer.service';
import { TrailerController } from './trailer.controller';

@Module({
  controllers: [TrailerController],
  providers: [TrailerService]
})
export class TrailerModule {}
