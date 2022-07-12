import { IUserDTO } from '../dtos/IUserDTO';

export interface IUserRepository {
  create(user: IUserDTO): Promise<void>;
  list(): Promise<IUserDTO[]>;
  find(id: number): Promise<IUserDTO | undefined>;
  findByEmail(email: string): Promise<IUserDTO | undefined>;
  delete(id: number): Promise<void>;
  hashPassword(password: string): Promise<string>;
}
