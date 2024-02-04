import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Base } from './base';
import { UserMeta } from './meta';
import { Role } from './role';
import { Session } from './session';
import { ParkingEntity } from './parkingEntity';

@Entity()
export class User extends Base {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  otp: string;

  @Column({ nullable: true, default: () => "NOW() + INTERVAL '5 minutes'" })
  otpExpiryTime: Date;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
  roles: Role[];

  @OneToMany(() => UserMeta, (users) => users.user, { cascade: true })
  userMetas: UserMeta[];

  @ManyToMany(() => Session, { cascade: true })
  @JoinTable()
  sessions: Session[];

  @OneToMany(() => ParkingEntity, (parking) => parking.owner)
  parking: ParkingEntity[];
}
