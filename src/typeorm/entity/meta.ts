import { Entity, ManyToOne } from 'typeorm';
import { Base } from './base';
import { User } from './user';

@Entity()
export class UserMeta extends Base {
  @ManyToOne(() => User, (user) => user.userMetas)
  user: User;
}
