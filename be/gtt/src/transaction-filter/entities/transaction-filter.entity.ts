/* eslint-disable prettier/prettier */
import { ClientStatus } from 'src/client-status/entities/client-status.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

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

  @ManyToMany(() => ClientStatus, (client: ClientStatus) => client.trade)
  @JoinTable()
  public client: ClientStatus[];
}
