import { Test, TestingModule } from '@nestjs/testing';
import { TransactionFilterController } from './transaction-filter.controller';
import { TransactionFilterService } from './transaction-filter.service';

describe('TransactionFilterController', () => {
  let controller: TransactionFilterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionFilterController],
      providers: [TransactionFilterService],
    }).compile();

    controller = module.get<TransactionFilterController>(TransactionFilterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
