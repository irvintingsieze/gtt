import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientStatus } from './entities/client-status.entity';
import { TransactionFilter } from 'src/transaction-filter/entities/transaction-filter.entity';
@Injectable()
export class CommonValidateService {
  constructor(
    @InjectRepository(ClientStatus)
    private clientStatusRepository: Repository<ClientStatus>,
    @InjectRepository(TransactionFilter)
    private transactionFilterRepository: Repository<TransactionFilter>,
  ) {}

  async doesInputValueExist(value: string, type: string) {
    try {
      let respList;
      if (type === 'client')
        respList = await this.clientStatusRepository.find({
          clientID: value,
        });
      else if (type === 'trade')
        respList = await this.transactionFilterRepository.find({
          tradeId: value,
        });
      else if (type === 'date')
        respList = await this.transactionFilterRepository.find({
          date: value,
        });
      if (!respList.length) return false;
      else return true;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async isInScopeGTTCheck(value: string, type: string) {
    try {
      let respList;
      if (type === 'trade')
        respList = await this.transactionFilterRepository.find({
          tradeId: value,
          isInScope: true,
        });
      else if (type === 'date')
        respList = await this.transactionFilterRepository.find({
          date: value,
          isInScope: true,
        });
      if (!respList.length) return false;
      else return true;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
