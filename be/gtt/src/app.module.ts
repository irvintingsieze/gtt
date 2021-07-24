import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientStatusModule } from './client-status/client-status.module';
import { GttCheckModule } from './gtt-check/gtt-check.module';
import { ClientStatus } from './client-status/entities/client-status.entity';
import { TransactionFilterModule } from './transaction-filter/transaction-filter.module';
import { TransactionFilter } from './transaction-filter/entities/transaction-filter.entity';
import { GttCheck } from './gtt-check/entities/gtt-check.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([ClientStatus, TransactionFilter, GttCheck]),
    TypeOrmModule.forRoot(),
    ClientStatusModule,
    GttCheckModule,
    TransactionFilterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
