import { Column, Entity } from 'typeorm';
import { Base } from './base';

@Entity()
export class Session extends Base {
  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column({ nullable: true })
  ip: string;

  @Column({ type: 'simple-json', nullable: true })
  systemAddress: Record<string, any>;

  @Column({ type: 'simple-json', nullable: true })
  metaJson: Record<string, any>;

  @Column({ nullable: true })
  browser: string;

  @Column({ default: false })
  status: boolean;

  @Column('simple-array', { nullable: true })
  bannedIps: string[];
}
