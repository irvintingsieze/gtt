import { Test, TestingModule } from '@nestjs/testing';
import { ClientStatusController } from './client-status.controller';
import { ClientStatusService } from './client-status.service';

describe('ClientStatusService', () => {
  let service: ClientStatusService;
  let controller: ClientStatusController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientStatusController],
      providers: [ClientStatusService],
    }).compile();

    service = module.get<ClientStatusService>(ClientStatusService);
  });

  describe('findClientByTradeID', () => {
    it('should call findClientByTradeID', async () => {
      const tradeID = '123';
      controller.findClientByTradeID(tradeID);
      expect(service.findClientByTradeID).toHaveBeenCalled();
    });
  });

  describe('findClientsByDate', () => {
    it('should call findClientsByDate', async () => {
      const date = '20210706';
      controller.findClientsByDate(date);
      expect(service.findClientByDate).toHaveBeenCalled();
    });
  });

  describe('findDetailsByClientId', () => {
    it('should call findDetailsByClientID', async () => {
      const clientID = '123';
      controller.findDetailsByClientId(clientID);
      expect(service.findDetailsByClientID).toHaveBeenCalled();
    });
  });
});
