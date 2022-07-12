import { inject, injectable } from 'tsyringe';
import { ISchedulingDTO } from '../dtos/ISchedulingDTO';
import { ISchedulingRepository } from '../repositories/ISchedulingRepository';

@injectable()
export class CreateSchedulingService {
  constructor(
    @inject('SchedulingRepository')
    private schedulingRepository: ISchedulingRepository
  ) {}

  public async execute(data: ISchedulingDTO): Promise<ISchedulingDTO> {
    const createdSchedule = await this.schedulingRepository.create(data);

    return createdSchedule;
  }
}
