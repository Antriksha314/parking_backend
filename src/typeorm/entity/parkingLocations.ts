import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Base } from './base';
import { ParkingEntity } from './parkingEntity';
import { Status } from '../../utils/enums';
import { Floor } from './floors';
import { ParkingOpeningHours } from './openingHours';

@Entity()
export class ParkingLocations extends Base {
  @Column()
  propertyName: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  zipCode: string;

  @Column()
  size: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @Column({ type: 'simple-json', nullable: true })
  metaJson: Record<string, any>;

  @OneToMany(() => Floor, (floor) => floor.location)
  floors: Floor[];

  @OneToMany(() => ParkingOpeningHours, (parkingOpeningHours) => parkingOpeningHours.location)
  parkingOpeningHours: ParkingOpeningHours[];

  @ManyToOne(() => ParkingEntity, (parking) => parking.locations)
  parking: ParkingEntity;
}
