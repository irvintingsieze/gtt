import { Test, TestingModule } from '@nestjs/testing';
import { GttCheckService } from './gtt-check.service';

describe('GttCheckService', () => {
  let service: GttCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GttCheckService],
    }).compile();

    service = module.get<GttCheckService>(GttCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
