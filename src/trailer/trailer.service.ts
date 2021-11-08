import { Injectable } from '@nestjs/common';
import { CreateTrailerDto } from './dto/create-trailer.dto';
import { UpdateTrailerDto } from './dto/update-trailer.dto';

@Injectable()
export class TrailerService {
  create(createTrailerDto: CreateTrailerDto) {
    return 'This action adds a new trailer';
  }

  findAll() {
    return `This action returns all trailer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trailer`;
  }

  update(id: number, updateTrailerDto: UpdateTrailerDto) {
    return `This action updates a #${id} trailer`;
  }

  remove(id: number) {
    return `This action removes a #${id} trailer`;
  }
}
