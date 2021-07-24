/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('transaction_filter')
export class TransactionFilter {
  @PrimaryColumn()
  tradeId: string;

  @Column()
  entityID: string;

  @Column()
  clientID: string;

  @Column({ type: 'date' })
  date: string;

  @Column()
  isInScope: boolean;
}
