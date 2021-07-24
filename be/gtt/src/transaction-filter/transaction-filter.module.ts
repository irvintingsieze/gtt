import { Module } from '@nestjs/common';
import { TransactionFilterService } from './transaction-filter.service';
import { TransactionFilterController } from './transaction-filter.controller';

@Module({
  controllers: [TransactionFilterController],
  providers: [TransactionFilterService]
})
export class TransactionFilterModule {}
