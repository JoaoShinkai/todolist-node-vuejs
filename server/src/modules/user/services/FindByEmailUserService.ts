import { inject, injectable } from 'tsyringe';
import { IUserDTO } from '../dtos/IUserDTO';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
export class findByEmail {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(email: string): Promise<IUserDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Usuario não encontrado');
    }

    return user;
  }
}
