import { Injectable } from '@nestjs/common';
import * as apidata from './../data/gtt_api_data_clean.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientStatus } from './client-status/entities/client-status.entity';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ClientStatus)
    private clientStatusRepository: Repository<ClientStatus>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  getJSON() {
    console.log(apidata.data[0]);
    return JSON.stringify(apidata);
  }
}
