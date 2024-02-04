import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Base } from './base';
import { Spot } from './spots';
import { Status, VehicleType } from '../../utils/enums';
import { Floor } from './floors';
import { Rate } from './rate';

@Entity()
export class Section extends Base {
  @Column()
  number: string;

  @Column()
  totalSpots: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @Column({
    type: 'enum',
    enum: VehicleType,
    default: VehicleType.CAR,
  })
  type: VehicleType;

  @ManyToOne(() => Floor, (floor) => floor.sections)
  floor: Floor;

  @OneToMany(() => Spot, (spot) => spot.section)
  spots: Spot[];

  @OneToMany(() => Rate, (price) => price.section, { cascade: true })
  price: Rate[];
}
