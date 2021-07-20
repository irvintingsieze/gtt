import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientEntityModule } from './client-entity/client-entity.module';

@Module({
  imports: [ClientEntityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
