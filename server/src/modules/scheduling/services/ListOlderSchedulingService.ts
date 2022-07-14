import { inject, injectable } from 'tsyringe';
import { ISchedulingDTO } from '../dtos/ISchedulingDTO';
import { ISchedulingRepository } from '../repositories/ISchedulingRepository';

@injectable()
export class ListOlderSchedulingService {
  constructor(
    @inject('SchedulingRepository')
    private schedulingRepository: ISchedulingRepository
  ) {}

  public async execute(userId: number): Promise<ISchedulingDTO[]> {
    return this.schedulingRepository.listOlder(userId);
  }
}
