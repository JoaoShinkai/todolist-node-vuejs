import { ISchedulingDTO } from '@modules/scheduling/dtos/ISchedulingDTO';
import { ISchedulingRepository } from '@modules/scheduling/repositories/ISchedulingRepository';
import { getRepository, Repository } from 'typeorm';
import { Scheduling } from '../entities/Scheduling';

export class SchedulingRepository implements ISchedulingRepository {
  private repository: Repository<Scheduling>;

  constructor() {
    this.repository = getRepository(Scheduling);
  }

  async create(data: ISchedulingDTO): Promise<ISchedulingDTO> {
    return this.repository.save(data);
  }

  async find(id: number): Promise<ISchedulingDTO | undefined> {
    return this.repository.findOne(id, { relations: ['user'] });
  }
}
