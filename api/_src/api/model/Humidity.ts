import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Humidity extends BaseEntity {
  constructor(humidity?: string, device?: string) {
    super();
    this.humidity = humidity;
    this.device = device;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('nvarchar')
  device: string;

  @Column('decimal')
  humidity: string;

  @Column('timestamp')
  date: string;
}
