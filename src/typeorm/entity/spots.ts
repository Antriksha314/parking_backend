import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from './base';
import { Section } from './sections';
import { Status, VehicleType } from '../../utils/enums';

@Entity()
export class Spot extends Base {
  @Column()
  number: string;

  @Column()
  uniqueId: string;

  @Column({
    type: 'enum',
    enum: VehicleType,
    default: VehicleType.CAR,
  })
  type: VehicleType;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @Column()
  size: string;

  @ManyToOne(() => Section, (section) => section.spots)
  section: Section;
}
