import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientStatusModule } from './client-status/client-status.module';
import { ClientStatus } from './client-status/entities/client-status.entity';
import { TransactionFilter } from './transaction-filter/entities/transaction-filter.entity';
import { GttCheck } from './gtt-check/entities/gtt-check.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([ClientStatus, TransactionFilter, GttCheck]),
    TypeOrmModule.forRoot(),
    ClientStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
