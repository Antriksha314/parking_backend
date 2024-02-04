import { roleType } from '../../utils/enums';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { Base } from './base';

@Entity()
export class Role extends Base {
  @Column()
  name: string;

  @Column({ type: 'enum', enum: roleType, default: roleType.USER })
  type: string;

  @Column()
  slug: string;

  @Column('simple-array', { nullable: true })
  permissions: [];

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = this.name.toLowerCase().split(' ').join('-') + '-' + this.type.toLowerCase();
  }
}
