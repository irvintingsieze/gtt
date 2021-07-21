import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientStatusModule } from './client-status/client-status.module';
import { GttCheckModule } from './gtt-check/gtt-check.module';
import { TradeModule } from './trade/trade.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ClientStatusModule,
    GttCheckModule,
    TradeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
