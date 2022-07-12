import { inject, injectable } from 'tsyringe';
import { IUserDTO } from '../dtos/IUserDTO';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(user: IUserDTO): Promise<void> {
    const hashedPassword = await this.userRepository.hashPassword(
      user.password
    );

    const newUser = user;
    newUser.password = hashedPassword;

    await this.userRepository.create(newUser);
  }
}
