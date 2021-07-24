import { Injectable } from '@nestjs/common';
import { CreateClientStatusDto } from './dto/create-client-status.dto';
import { UpdateClientStatusDto } from './dto/update-client-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientStatus } from './entities/client-status.entity';
import { TransactionFilter } from 'src/transaction-filter/entities/transaction-filter.entity';
import { GttCheck } from 'src/gtt-check/entities/gtt-check.entity';
@Injectable()
export class ClientStatusService {
  constructor(
    @InjectRepository(ClientStatus)
    private clientStatusRepository: Repository<ClientStatus>,
    @InjectRepository(TransactionFilter)
    private transactionFilterRepository: Repository<TransactionFilter>,
    @InjectRepository(GttCheck)
    private gttCheckRepository: Repository<GttCheck>,
  ) {}
  create(createClientStatusDto: CreateClientStatusDto) {
    return 'This action adds a new clientStatus';
  }

  async findClientByDate(date: string) {
    const transactionFilter = await this.transactionFilterRepository.find({
      date: date,
      isInScope: true,
    });
    let i,
      outPutClientDetails = [];
    const clientList = [],
      RED_STATUS = 'RED';
    for (i = 0; i < transactionFilter.length; i++) {
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
          return element.clients[0].clientID === transactionFilter[i].clientID;
        };
        const indexInArr = outPutClientDetails.findIndex(isClient);
        outPutClientDetails[indexInArr].transactions.push(
          transactionFilter[i].tradeId,
        );
      }
    }
    return outPutClientDetails;
  }
}
