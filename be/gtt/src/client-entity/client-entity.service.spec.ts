import { Test, TestingModule } from '@nestjs/testing';
import { ClientEntityService } from './client-entity.service';

describe('ClientEntityService', () => {
  let service: ClientEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientEntityService],
    }).compile();

    service = module.get<ClientEntityService>(ClientEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
