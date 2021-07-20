import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientEntityService } from './client-entity.service';
import { CreateClientEntityDto } from './dto/create-client-entity.dto';
import { UpdateClientEntityDto } from './dto/update-client-entity.dto';

@Controller('client-entity')
export class ClientEntityController {
  constructor(private readonly clientEntityService: ClientEntityService) {}

  @Post()
  create(@Body() createClientEntityDto: CreateClientEntityDto) {
    return this.clientEntityService.create(createClientEntityDto);
  }

  @Get()
  findAll() {
    return this.clientEntityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientEntityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientEntityDto: UpdateClientEntityDto) {
    return this.clientEntityService.update(+id, updateClientEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientEntityService.remove(+id);
  }
}
