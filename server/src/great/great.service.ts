import { Injectable } from '@nestjs/common';
import { CreateGreatDto } from './dto/create-great.dto';
import { UpdateGreatDto } from './dto/update-great.dto';

@Injectable()
export class GreatService {
  create(createGreatDto: CreateGreatDto) {
    return 'This action adds a new great';
  }

  findAll() {
    return `This action returns all great`;
  }

  findOne(id: number) {
    return `This action returns a #${id} great`;
  }

  update(id: number, updateGreatDto: UpdateGreatDto) {
    return `This action updates a #${id} great`;
  }

  remove(id: number) {
    return `This action removes a #${id} great`;
  }
}
