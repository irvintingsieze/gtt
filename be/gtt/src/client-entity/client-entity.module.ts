import { Module } from '@nestjs/common';
import { ClientEntityService } from './client-entity.service';
import { ClientEntityController } from './client-entity.controller';

@Module({
  controllers: [ClientEntityController],
  providers: [ClientEntityService]
})
export class ClientEntityModule {}
