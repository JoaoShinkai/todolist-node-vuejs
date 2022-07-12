import { SchedulingRepository } from '@modules/scheduling/infra/typeorm/repositories/SchedulingRepository';
import { ISchedulingRepository } from '@modules/scheduling/repositories/ISchedulingRepository';
import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<ISchedulingRepository>(
  'SchedulingRepository',
  SchedulingRepository
);
