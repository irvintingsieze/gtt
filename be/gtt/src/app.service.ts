import { Injectable, InternalServerErrorException } from '@nestjs/common';
//import * as apidata from './../data/gtt_api_data_clean.json';
//import * as tradedata from './../data/gtt_trade_data_clean.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientStatus } from './client-status/entities/client-status.entity';
import { TransactionFilter } from './transaction-filter/entities/transaction-filter.entity';
import { GttCheck } from './gtt-check/entities/gtt-check.entity';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ClientStatus)
    private clientStatusRepository: Repository<ClientStatus>,
    @InjectRepository(TransactionFilter)
    private transactionFilterRepository: Repository<TransactionFilter>,
    @InjectRepository(GttCheck)
    private gttCheckRepository: Repository<GttCheck>,
  ) {}

  //Not Required By Requirements!
  /*
  async inputGTTApiData() {
    let i, j;
    for (i = 0; i < apidata.data.length; i++) {
      for (j = 0; j < Object.values(apidata.data[i])[0].length; j++) {
        const newClientStatus = new ClientStatus();
        newClientStatus.entityID = Object.values(apidata.data[i])[0][
          j
        ].entityId;
        newClientStatus.documentID = Object.values(apidata.data[i])[0][
          j
        ].documentId;
        newClientStatus.status = Object.values(apidata.data[i])[0][j].status;
        newClientStatus.clientID = Object.keys(apidata.data[i])[0];
        await this.clientStatusRepository.save(newClientStatus);
      }
    }
  }
  */

  checkIsInScope(tradedataitem) {
    if (
      tradedataitem.regulation === 'SFT_REPORTING' &&
      tradedataitem.reportingSide === 'FIRM' &&
      (tradedataitem.jurisdiction === 'UK' ||
        tradedataitem.jurisdiction === 'EU') &&
      (tradedataitem.securitiesFinancingTransactionType ===
        'SECURITIES_LENDING' ||
        tradedataitem.securitiesFinancingTransactionType === 'REPURCHASE' ||
        tradedataitem.securitiesFinancingTransactionType === 'MARGIN_LENDING' ||
        tradedataitem.securitiesFinancingTransactionType === 'BUY_BACK') &&
      (tradedataitem.regulatoryReportingDetails.reportingCounterpartyID ===
        'FNB-UK' ||
        tradedataitem.regulatoryReportingDetails.reportingCounterpartyID ===
          'FNB-EU')
    ) {
      return true;
    }
    return false;
  }

  async inputGTTTradeData(tradedata) {
    try {
      let i;
      for (i = 0; i < tradedata.data.length; i++) {
        const newTransactionFilter = new TransactionFilter();
        const newGttCheck = new GttCheck();
        newTransactionFilter.tradeId = tradedata.data[i].tradeID;
        newTransactionFilter.clientID =
          tradedata.data[i].regulatoryReportingDetails.counterpartyID;
        newTransactionFilter.entityID =
          tradedata.data[i].regulatoryReportingDetails.reportingCounterpartyID;
        const client = await this.clientStatusRepository.find({
          clientID: newTransactionFilter.clientID,
          entityID: newTransactionFilter.entityID,
        });
        if (client.length === 0) continue;
        newTransactionFilter.date = tradedata.data[i].date;
        newGttCheck.jurisdiction = tradedata.data[i].jurisdiction;
        newGttCheck.regulation = tradedata.data[i].regulation;
        newGttCheck.reportingSide = tradedata.data[i].reportingSide;
        newGttCheck.securitiesFinancingTransactionType =
          tradedata.data[i].securitiesFinancingTransactionType;
        newGttCheck.tradeId = tradedata.data[i].tradeID;
        newTransactionFilter.isInScope = this.checkIsInScope(tradedata.data[i]);
        await this.gttCheckRepository.save(newGttCheck);
        newTransactionFilter.client = client;
        await this.transactionFilterRepository.save(newTransactionFilter);
      }
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
