import { Injectable } from '@nestjs/common';
import { CreateTransactionFilterDto } from './dto/create-transaction-filter.dto';
import { UpdateTransactionFilterDto } from './dto/update-transaction-filter.dto';

@Injectable()
export class TransactionFilterService {
  create(createTransactionFilterDto: CreateTransactionFilterDto) {
    return 'This action adds a new transactionFilter';
  }

  findAll() {
    return `This action returns all transactionFilter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transactionFilter`;
  }

  update(id: number, updateTransactionFilterDto: UpdateTransactionFilterDto) {
    return `This action updates a #${id} transactionFilter`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionFilter`;
  }
}
