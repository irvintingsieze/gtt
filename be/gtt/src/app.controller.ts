import {
  Controller,
  Get,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { DataDto } from './data.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const data = fs.readFileSync('./data/' + file.filename, 'utf8');
      const jsonData = JSON.parse(data);
      this.appService.inputGTTTradeData(jsonData);
      return 'Data Added! ' + file.filename;
    } catch (error) {
      return 'File Is In Wrong Format!';
    }
  }
}
