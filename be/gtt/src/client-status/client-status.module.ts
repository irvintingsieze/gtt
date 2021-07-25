import { Module } from '@nestjs/common';
import { ClientStatusService } from './client-status.service';
import { ClientStatusController } from './client-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientStatus } from './entities/client-status.entity';
import { TransactionFilter } from 'src/transaction-filter/entities/transaction-filter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientStatus, TransactionFilter])],
  controllers: [ClientStatusController],
  providers: [ClientStatusService],
})
export class ClientStatusModule {}
