import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { ClientStatusService } from './client-status.service';
import { CommonValidateService } from './common-validate.service';

@Controller('client-status')
export class ClientStatusController {
  constructor(
    private readonly clientStatusService: ClientStatusService,
    private readonly validateService: CommonValidateService,
  ) {}

  @Get('/trade')
  async findClientByTradeID(@Query('tradeid') tradeid: string) {
    tradeid = tradeid.toUpperCase();
    if (!(await this.validateService.doesInputValueExist(tradeid, 'trade')))
      return 'Trade ID Not Found!';
    if (!(await this.validateService.isInScopeGTTCheck(tradeid, 'trade')))
      return 'Not In Scope For GTT Check!';
    return this.clientStatusService.findClientByTradeID(tradeid);
  }

  @Get('/date')
  async findClientsByDate(@Query('date') date: string) {
    if (!(await this.validateService.doesInputValueExist(date, 'date')))
      return 'No Trades In This Date!';
    if (!(await this.validateService.isInScopeGTTCheck(date, 'date')))
      return 'Not In Scope For GTT Check!';
    return this.clientStatusService.findClientByDate(date);
  }

  @Get('/client')
  async findDetailsByClientId(@Query('clientid') clientid: string) {
    clientid = clientid.toUpperCase();
    if (!(await this.validateService.doesInputValueExist(clientid, 'client')))
      return 'No Clients Found!';
    return this.clientStatusService.findDetailsByClientID(clientid);
  }
}
