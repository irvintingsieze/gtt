import { Test, TestingModule } from '@nestjs/testing';
import { GttCheckController } from './gtt-check.controller';
import { GttCheckService } from './gtt-check.service';

describe('GttCheckController', () => {
  let controller: GttCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GttCheckController],
      providers: [GttCheckService],
    }).compile();

    controller = module.get<GttCheckController>(GttCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
