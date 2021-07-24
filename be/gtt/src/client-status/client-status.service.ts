import { Injectable } from '@nestjs/common';
import { CreateClientStatusDto } from './dto/create-client-status.dto';
import { UpdateClientStatusDto } from './dto/update-client-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientStatus } from './entities/client-status.entity';
import { TransactionFilter } from 'src/transaction-filter/entities/transaction-filter.entity';
import { GttCheck } from 'src/gtt-check/entities/gtt-check.entity';
@Injectable()
export class ClientStatusService {
  constructor(
    @InjectRepository(ClientStatus)
    private clientStatusRepository: Repository<ClientStatus>,
    @InjectRepository(TransactionFilter)
    private transactionFilterRepository: Repository<TransactionFilter>,
    @InjectRepository(GttCheck)
    private gttCheckRepository: Repository<GttCheck>,
  ) {}
  create(createClientStatusDto: CreateClientStatusDto) {
    return 'This action adds a new clientStatus';
  }

  findAll() {
    return `This action returns all clientStatus`;
  }

  async findClientByDate(date: string) {
    const transactionFilter = await this.transactionFilterRepository.find({
      date: date,
      isInScope: true,
    });
    console.log(transactionFilter);
  }

  update(id: number, updateClientStatusDto: UpdateClientStatusDto) {
    return `This action updates a #${id} clientStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientStatus`;
  }
}
