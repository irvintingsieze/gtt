import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientStatusDto } from './dto/create-client-status.dto';
import { UpdateClientStatusDto } from './dto/update-client-status.dto';
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
      let outPutClientDetails = [];
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
      const transactionFilter =
        await this.transactionFilterRepository.findOneOrFail({
          tradeId: tradeID,
          isInScope: true,
        });
      const clientStatus = await this.clientStatusRepository.find({
        clientID: transactionFilter.clientID,
        entityID: transactionFilter.entityID,
        status: RED_STATUS,
      });
      if (clientStatus.length !== 0) {
        return {
          transactionID: transactionFilter.tradeId,
          clients: [clientStatus],
        };
      }
      return 'No Clients!';
    } catch (error) {
      return new NotFoundException('Trade Id does not exist or not in scope!');
    }
  }

  async findDetailsByClientID(clientID: string) {
    const client = await this.clientStatusRepository.find({
      clientID: clientID,
      status: RED_STATUS,
    });
    if (client.length === 0) return 'All Gtt Pass or Client Not Found';
    let transactionList = [];
    for (let i = 0; i < client.length; i++) {
      const transactions = await this.transactionFilterRepository.find({
        select: ['tradeId'],
        where: {
          clientID: clientID,
          entityID: client[i].entityID,
          isInScope: true,
        },
      });
      transactionList = transactionList.concat(transactions);
    }
    if (transactionList.length === 0) return 'No Trade';
    return {
      transactionList: transactionList,
      clientList: client,
    };
  }
}
