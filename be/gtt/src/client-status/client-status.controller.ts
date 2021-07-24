import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ClientStatusService } from './client-status.service';
import { CreateClientStatusDto } from './dto/create-client-status.dto';
import { UpdateClientStatusDto } from './dto/update-client-status.dto';

@Controller('client-status')
export class ClientStatusController {
  constructor(private readonly clientStatusService: ClientStatusService) {}

  @Post()
  create(@Body() createClientStatusDto: CreateClientStatusDto) {
    return this.clientStatusService.create(createClientStatusDto);
  }

  @Get()
  findAll(@Query() date: { date: string }) {
    return this.clientStatusService.findClientByDate(date.date);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClientStatusDto: UpdateClientStatusDto,
  ) {
    return this.clientStatusService.update(+id, updateClientStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientStatusService.remove(+id);
  }
}
