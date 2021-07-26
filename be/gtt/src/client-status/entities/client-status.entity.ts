/* eslint-disable prettier/prettier */
import { TransactionFilter } from 'src/transaction-filter/entities/transaction-filter.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client_status')
export class ClientStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documentID: string;

  @Column()
  entityID: string;

  @Column()
  status: string;

  @Column()
  clientID: string;

  @ManyToMany(
    () => TransactionFilter,
    (trade: TransactionFilter) => trade.client,
  )
  public trade: TransactionFilter[];
}
