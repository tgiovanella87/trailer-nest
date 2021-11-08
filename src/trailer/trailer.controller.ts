import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrailerService } from './trailer.service';
import { CreateTrailerDto } from './dto/create-trailer.dto';
import { UpdateTrailerDto } from './dto/update-trailer.dto';

@Controller('trailer')
export class TrailerController {
  constructor(private readonly trailerService: TrailerService) {}

  @Post()
  create(@Body() createTrailerDto: CreateTrailerDto) {
    return this.trailerService.create(createTrailerDto);
  }

  @Get()
  findAll() {
    return this.trailerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trailerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrailerDto: UpdateTrailerDto) {
    return this.trailerService.update(+id, updateTrailerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trailerService.remove(+id);
  }
}
