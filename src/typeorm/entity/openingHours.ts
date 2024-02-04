import { Status } from '../../utils/enums';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ParkingLocations } from './parkingLocations';

@Entity()
export class ParkingOpeningHours {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dayName: string;

  @Column()
  openingTime: string;

  @Column()
  closingTime: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @ManyToOne(() => ParkingLocations, (location) => location.parkingOpeningHours, { cascade: true })
  location: ParkingLocations;
}
