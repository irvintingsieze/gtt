import { Injectable } from '@nestjs/common';
import { CreateGttCheckDto } from './dto/create-gtt-check.dto';

@Injectable()
export class GttCheckService {
  create(createGttCheckDto: CreateGttCheckDto) {
    return 'This action adds a new gttCheck';
  }

  findAll() {
    return `This action returns all gttCheck`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gttCheck`;
  }

  remove(id: number) {
    return `This action removes a #${id} gttCheck`;
  }
}
