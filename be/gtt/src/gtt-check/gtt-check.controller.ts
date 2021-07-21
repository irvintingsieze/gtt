import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GttCheckService } from './gtt-check.service';
import { CreateGttCheckDto } from './dto/create-gtt-check.dto';
import { UpdateGttCheckDto } from './dto/update-gtt-check.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGttCheckDto: UpdateGttCheckDto) {
    return this.gttCheckService.update(+id, updateGttCheckDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gttCheckService.remove(+id);
  }
}
