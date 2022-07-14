import { ISchedulingDTO } from '../dtos/ISchedulingDTO';

export interface ISchedulingRepository {
  create(data: ISchedulingDTO): Promise<ISchedulingDTO>;
  find(id: number): Promise<ISchedulingDTO | undefined>;
  list(id: number): Promise<ISchedulingDTO[]>;
  listOlder(id: number): Promise<ISchedulingDTO[]>;
}
