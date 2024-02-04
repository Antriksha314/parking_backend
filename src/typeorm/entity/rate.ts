import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from './base';
import { Section } from './sections';
import { DurationType } from '../../utils/enums';

@Entity()
export class Rate extends Base {
  @Column()
  price: number;

  @Column()
  duration: string;

  @Column({
    type: 'enum',
    enum: DurationType,
    default: DurationType.HOURS,
  })
  type: DurationType;
  @ManyToOne(() => Section, (section) => section.price)
  section: Section;
}
