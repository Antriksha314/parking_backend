import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Base } from './base';
import { ParkingLocations } from './parkingLocations';
import { User } from './user';
import { ParkingStatusType } from '../../utils/enums';

@Entity()
export class ParkingEntity extends Base {
  @Column()
  name: string;

  @Column()
  size: number;

  @Column()
  capacity: number;

  @Column()
  totalLocations: number;

  @Column({
    type: 'enum',
    enum: ParkingStatusType,
    default: ParkingStatusType.PENDING,
  })
  status: ParkingStatusType;

  @Column({ type: 'simple-json', nullable: true })
  metaJson: Record<string, any>;

  @OneToMany(() => ParkingLocations, (location) => location.parking)
  locations: ParkingLocations[];

  @ManyToOne(() => User, (user) => user.parking)
  owner: User;
}
