import { Injectable } from '@nestjs/common';
import * as apidata from './../data/gtt_api_data_clean.json';
import * as tradedata from './../data/gtt_trade_clean.json';
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
  getHello(): string {
    return 'Hello World!';
  }

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

  async inputGTTTradeData() {
    let i;
    for (i = 0; i < tradedata.data.length; i++) {
      const newTransactionFilter = new TransactionFilter();
      const newGttCheck = new GttCheck();
      newTransactionFilter.tradeId = tradedata.data[i].tradeID;
      newTransactionFilter.clientID =
        tradedata.data[i].regulatoryReportingDetails.counterpartyID;
      newTransactionFilter.entityID =
        tradedata.data[i].regulatoryReportingDetails.reportingCounterpartyID;
      newTransactionFilter.date = tradedata.data[i].date;
      newGttCheck.jurisdiction = tradedata.data[i].jurisdiction;
      newGttCheck.regulation = tradedata.data[i].regulation;
      newGttCheck.reportingSide = tradedata.data[i].reportingSide;
      newGttCheck.securitiesFinancingTransactionType =
        tradedata.data[i].securitiesFinancingTransactionType;
      newGttCheck.tradeId = tradedata.data[i].tradeID;
      if (
        tradedata.data[i].regulation === 'SFT_REPORTING' &&
        tradedata.data[i].reportingSide === 'FIRM' &&
        (tradedata.data[i].jurisdiction === 'UK' ||
          tradedata.data[i].jurisdiction === 'EU') &&
        (tradedata.data[i].securitiesFinancingTransactionType ===
          'SECURITIES_LENDING' ||
          tradedata.data[i].securitiesFinancingTransactionType ===
            'REPURCHASE' ||
          tradedata.data[i].securitiesFinancingTransactionType ===
            'MARGIN_LENDING' ||
          tradedata.data[i].securitiesFinancingTransactionType ===
            'BUY_BACK') &&
        (tradedata.data[i].regulatoryReportingDetails
          .reportingCounterpartyID === 'FNB-UK' ||
          tradedata.data[i].regulatoryReportingDetails
            .reportingCounterpartyID === 'FNB-EU')
      ) {
        newTransactionFilter.isInScope = true;
      } else {
        newTransactionFilter.isInScope = false;
      }
      await this.gttCheckRepository.save(newGttCheck);
      await this.transactionFilterRepository.save(newTransactionFilter);
    }
    return JSON.stringify(tradedata);
  }
}
