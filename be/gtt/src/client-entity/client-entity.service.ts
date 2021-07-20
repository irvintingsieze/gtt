import { Injectable } from '@nestjs/common';
import { CreateClientEntityDto } from './dto/create-client-entity.dto';
import { UpdateClientEntityDto } from './dto/update-client-entity.dto';

@Injectable()
export class ClientEntityService {
  create(createClientEntityDto: CreateClientEntityDto) {
    return 'This action adds a new clientEntity';
  }

  findAll() {
    return `This action returns all clientEntity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clientEntity`;
  }

  update(id: number, updateClientEntityDto: UpdateClientEntityDto) {
    return `This action updates a #${id} clientEntity`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientEntity`;
  }
}
