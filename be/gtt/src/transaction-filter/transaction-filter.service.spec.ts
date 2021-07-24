import { Test, TestingModule } from '@nestjs/testing';
import { TransactionFilterService } from './transaction-filter.service';

describe('TransactionFilterService', () => {
  let service: TransactionFilterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionFilterService],
    }).compile();

    service = module.get<TransactionFilterService>(TransactionFilterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
