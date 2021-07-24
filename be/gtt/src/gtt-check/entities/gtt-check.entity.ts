/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('gtt_check')
export class GttCheck {
  @PrimaryColumn()
  tradeId: string;

  @Column()
  regulation: string;

  @Column()
  reportingSide: string;

  @Column()
  jurisdiction: string;

  @Column()
  securitiesFinancingTransactionType: string;
}
