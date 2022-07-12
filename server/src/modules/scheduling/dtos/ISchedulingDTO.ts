import { IUserDTO } from '@modules/user/dtos/IUserDTO';
import { IDefaultDTO } from '@shared/dtos/IDefaultDTO';

export interface ISchedulingDTO extends IDefaultDTO {
  date: Date;
  description: string;
  user: IUserDTO;
}
