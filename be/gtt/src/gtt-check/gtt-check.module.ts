import { Module } from '@nestjs/common';
import { GttCheckService } from './gtt-check.service';
import { GttCheckController } from './gtt-check.controller';

@Module({
  controllers: [GttCheckController],
  providers: [GttCheckService]
})
export class GttCheckModule {}
