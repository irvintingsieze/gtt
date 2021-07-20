import { Injectable } from '@nestjs/common';
import * as apidata from './../data/gtt_api_data_clean.json';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getJSON() {
    return JSON.stringify(apidata);
  }
}
