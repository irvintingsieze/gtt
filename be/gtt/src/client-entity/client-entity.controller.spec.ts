import { Test, TestingModule } from '@nestjs/testing';
import { ClientEntityController } from './client-entity.controller';
import { ClientEntityService } from './client-entity.service';

describe('ClientEntityController', () => {
  let controller: ClientEntityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientEntityController],
      providers: [ClientEntityService],
    }).compile();

    controller = module.get<ClientEntityController>(ClientEntityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
