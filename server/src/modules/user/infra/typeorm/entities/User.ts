import { IUserDTO } from '@modules/user/dtos/IUserDTO';
import { DefaultEntity } from '@shared/infra/typeorm/entities/DefaultEntity';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class User extends DefaultEntity implements IUserDTO {
  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  cellphone: string;
}
