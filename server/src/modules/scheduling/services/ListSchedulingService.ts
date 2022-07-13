import { inject, injectable } from 'tsyringe';
import { ISchedulingDTO } from '../dtos/ISchedulingDTO';
import { ISchedulingRepository } from '../repositories/ISchedulingRepository';

@injectable()
export class ListSchedulingService {
  constructor(
    @inject('SchedulingRepository')
    private schedulingRepository: ISchedulingRepository
  ) {}

  public async execute(id: number): Promise<ISchedulingDTO[]> {
    return this.schedulingRepository.list(id);
  }
}
