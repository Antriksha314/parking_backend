import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Base } from './base';
import { ParkingLocations } from './parkingLocations';
import { Status } from '../../utils/enums';
import { Section } from './sections';

@Entity()
export class Floor extends Base {
  @Column()
  floorNumber: number;

  @Column()
  totalSections: number;

  @Column()
  totalSectionsForCar: number;

  @Column()
  totalSectionsForBike: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @ManyToOne(() => ParkingLocations, (location) => location.floors, { cascade: true })
  location: ParkingLocations;

  @OneToMany(() => Section, (section) => section.floor)
  sections: Section[];
}
