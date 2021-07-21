import { Injectable } from '@nestjs/common';
import { CreateClientStatusDto } from './dto/create-client-status.dto';
import { UpdateClientStatusDto } from './dto/update-client-status.dto';

@Injectable()
export class ClientStatusService {
  create(createClientStatusDto: CreateClientStatusDto) {
    return 'This action adds a new clientStatus';
  }

  findAll() {
    return `This action returns all clientStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clientStatus`;
  }

  update(id: number, updateClientStatusDto: UpdateClientStatusDto) {
    return `This action updates a #${id} clientStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientStatus`;
  }
}
