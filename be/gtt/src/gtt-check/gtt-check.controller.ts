import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GttCheckService } from './gtt-check.service';
import { CreateGttCheckDto } from './dto/create-gtt-check.dto';

@Controller('gtt-check')
export class GttCheckController {
  constructor(private readonly gttCheckService: GttCheckService) {}

  @Post()
  create(@Body() createGttCheckDto: CreateGttCheckDto) {
    return this.gttCheckService.create(createGttCheckDto);
  }

  @Get()
  findAll() {
    return this.gttCheckService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gttCheckService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gttCheckService.remove(+id);
  }
}
