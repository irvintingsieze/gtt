import { Controller, Get, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DataDto } from './data.dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/add_data')
  addData(@Body() dataDto: DataDto) {
    //return this.appService.addTradeDataToDB(dataDto);
  }

  @Post('/add_data_local')
  addLocalData() {
    //return this.appService.inputGTTApiData();
    return this.appService.inputGTTTradeData();
  }
}
