import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientStatusModule } from './client-status/client-status.module';
import { GttCheckModule } from './gtt-check/gtt-check.module';
import { TradeModule } from './trade/trade.module';
import { ClientStatus } from './client-status/entities/client-status.entity';
import { ClientModule } from './client/client.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([ClientStatus]),
    TypeOrmModule.forRoot(),
    ClientStatusModule,
    GttCheckModule,
    TradeModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
