import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ClientStatusService } from './client-status.service';
import { CreateClientStatusDto } from './dto/create-client-status.dto';

@Controller('client-status')
export class ClientStatusController {
  constructor(private readonly clientStatusService: ClientStatusService) {}

  @Post()
  create(@Body() createClientStatusDto: CreateClientStatusDto) {
    return this.clientStatusService.create(createClientStatusDto);
  }

  @Get('/trade/:tradeid')
  findClientByTradeID(@Param('tradeid') tradeid: string) {
    return this.clientStatusService.findClientByTradeID(tradeid);
  }

  @Get()
  findClientsByDate(@Query('date') date: string) {
    return this.clientStatusService.findClientByDate(date);
  }

  @Get('/client/:clientid')
  findDetailsByClientId(@Param('clientid') clientid: string) {
    return this.clientStatusService.findDetailsByClientID(clientid);
  }
}
