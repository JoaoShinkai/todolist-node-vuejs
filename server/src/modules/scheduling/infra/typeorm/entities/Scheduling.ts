import { ISchedulingDTO } from '@modules/scheduling/dtos/ISchedulingDTO';
import { User } from '@modules/user/infra/typeorm/entities/User';
import { DefaultEntity } from '@shared/infra/typeorm/entities/DefaultEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('scheduling')
export class Scheduling extends DefaultEntity implements ISchedulingDTO {
  @Column()
  date: Date;

  @Column()
  description: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
