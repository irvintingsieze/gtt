import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientStatusDto } from './dto/create-client-status.dto';
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
  create(createClientStatusDto: CreateClientStatusDto) {
    return 'This action adds a new clientStatus';
  }

  async findClientByDate(date: string) {
    try {
      const transactionFilter = await this.transactionFilterRepository.find({
        date: date,
        isInScope: true,
      });
      const outPutClientDetails = [];
      const clientList = [];
      for (let i = 0; i < transactionFilter.length; i++) {
        if (!clientList.includes(transactionFilter[i].clientID)) {
          const clientDetailList = await this.clientStatusRepository.find({
            clientID: transactionFilter[i].clientID,
            entityID: transactionFilter[i].entityID,
            status: RED_STATUS,
          });
          if (clientDetailList.length === 0) {
            continue;
          }
          clientList.push(transactionFilter[i].clientID);
          const newTransactionObj = {
            transactions: [transactionFilter[i].tradeId],
            clients: clientDetailList,
          };
          outPutClientDetails.push(newTransactionObj);
        } else {
          const isClient = (element) => {
            return (
              element.clients[0].clientID === transactionFilter[i].clientID
            );
          };
          const indexInArr = outPutClientDetails.findIndex(isClient);
          outPutClientDetails[indexInArr].transactions.push(
            transactionFilter[i].tradeId,
          );
        }
      }
      return outPutClientDetails;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findClientByTradeID(tradeID: string) {
    try {
      const transactionFilter = await this.transactionFilterRepository.findOne({
        tradeId: tradeID,
      });
      if (!transactionFilter) return 'Trade ID Not Found';
      if (!transactionFilter.isInScope)
        return 'Client Is Not In Scope And Good To Trade';
      const clientStatus = await this.clientStatusRepository.find({
        clientID: transactionFilter.clientID,
        entityID: transactionFilter.entityID,
        status: RED_STATUS,
      });
      if (clientStatus.length !== 0) {
        return {
          tradeID: transactionFilter.tradeId,
          clients: clientStatus,
        };
      }
      return 'Client Is Good To Trade!';
    } catch (error) {
      return new NotFoundException(error);
    }
  }

  async findDetailsByClientID(clientID: string) {
    const clientExist = await this.clientStatusRepository.find({
      clientID: clientID,
    });
    if (clientExist.length === 0) return 'Client Not Found';
    const client = clientExist.filter((element) => {
      return element.status === RED_STATUS;
    });
    if (client.length === 0) return 'Client Is Good To Trade';
    let transactionList = [];
    for (let i = 0; i < client.length; i++) {
      const transactions = await this.transactionFilterRepository.find({
        where: {
          clientID: clientID,
          entityID: client[i].entityID,
          isInScope: true,
        },
      });
      if (transactions.length > 0) {
        const clientItem = {
          client: client[i],
          transactionList: transactions,
        };
        transactionList = transactionList.concat(clientItem);
      }
    }
    if (transactionList.length === 0) return 'No Trade History Found';
    return transactionList;
  }
}
