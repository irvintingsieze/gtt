import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client_entity')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: string;

  @Column()
  entityId: string;
}
