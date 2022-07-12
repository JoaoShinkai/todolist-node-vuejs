import { IDefaultDTO } from '@shared/dtos/IDefaultDTO';

export interface IUserDTO extends IDefaultDTO {
  name: string;
  password: string;
  email: string;
  cellphone: string;
}
