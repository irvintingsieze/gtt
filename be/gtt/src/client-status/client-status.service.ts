import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientStatus } from './entities/client-status.entity';
import { TransactionFilter } from 'src/transaction-filter/entities/transaction-filter.entity';
import RED_STATUS from './../../utils/Constants';
@Injectable()
export class ClientStatusService {
  constructor(
    @InjectRepository(ClientStatus)
    private clientStatusRepository: Repository<ClientStatus>,
    @InjectRepository(TransactionFilter)
    private transactionFilterRepository: Repository<TransactionFilter>,
  ) {}

  async findClientByTradeID(tradeid: string) {
    try {
      const tradeClient = await this.transactionFilterRepository.find({
        relations: ['client'],
        where: [{ tradeId: tradeid, isInScope: true }],
      });
      const returnList = [];
      for (let i = 0; i < tradeClient[0].client.length; i++) {
        if (tradeClient[0].client[i].status === RED_STATUS)
          returnList.push({
            id: tradeClient[0].client[i].id,
            tradeId: tradeid,
            entityId: tradeClient[0].entityID,
            clientId: tradeClient[0].clientID,
            documentId: tradeClient[0].client[i].documentID,
            date: tradeClient[0].date,
          });
      }
      if (returnList.length === 0) return 'All Client Pass GTT Check!';
      return returnList;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findDetailsByClientID(clientid: string) {
    try {
      const client = await this.clientStatusRepository.find({
        relations: ['trade'],
        where: [{ clientID: clientid, status: RED_STATUS }],
      });
      const resultList = [];
      let index = 0;
      for (let i = 0; i < client.length; i++) {
        for (let j = 0; j < client[i].trade.length; j++) {
          if (client[i].trade[j].isInScope === true) {
            index += 1;
            resultList.push({
              id: index,
              tradeId: client[i].trade[j].tradeId,
              entityId: client[i].entityID,
              clientId: clientid,
              documentId: client[i].documentID,
              date: client[i].trade[j].date,
            });
          }
        }
      }
      if (resultList.length === 0) return 'In Scope for GTT Check And GTT!';
      return resultList;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findClientByDate(date: string) {
    try {
      const tradeList = await this.transactionFilterRepository.find({
        relations: ['client'],
        where: [{ date: date, isInScope: true }],
      });
      let index = 0;
      const resultList = [];
      for (let i = 0; i < tradeList.length; i++) {
        for (let j = 0; j < tradeList[i].client.length; j++) {
          if (tradeList[i].client[j].status === RED_STATUS) {
            index += 1;
            resultList.push({
              id: index,
              tradeId: tradeList[i].tradeId,
              entityId: tradeList[i].entityID,
              clientId: tradeList[i].client[j].clientID,
              documentId: tradeList[i].client[j].documentID,
              date: date,
            });
          }
        }
      }
      if (resultList.length === 0) return 'In Scope for GTT Check And GTT!';
      return resultList;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
