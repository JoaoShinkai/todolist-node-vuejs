import { IUserDTO } from '@modules/user/dtos/IUserDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import bcryptjs from 'bcryptjs';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(user: IUserDTO): Promise<void> {
    await this.repository.save(user);
  }

  async list(): Promise<IUserDTO[]> {
    return this.repository.find();
  }

  async find(id: number): Promise<IUserDTO | undefined> {
    return this.repository.findOne(id);
  }

  async findByEmail(email: string): Promise<IUserDTO | undefined> {
    return this.repository.findOne({ email });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt(8);
    return bcryptjs.hashSync(password, salt);
  }
}
