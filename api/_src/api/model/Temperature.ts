import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Temperature extends BaseEntity {
  constructor(temperature?: string, device?: string) {
    super();
    this.temperature = temperature;
    this.device = device;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('nvarchar')
  device: string;

  @Column('decimal')
  temperature: string;

  @Column('timestamp')
  date: string;
}
