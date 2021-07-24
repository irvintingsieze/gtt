/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
