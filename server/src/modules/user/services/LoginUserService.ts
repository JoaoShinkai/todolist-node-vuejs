import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IUserDTO } from '../dtos/IUserDTO';
import { IUserRepository } from '../repositories/IUserRepository';

interface ILoginUser {
  user: Partial<IUserDTO>;
  token: string;
}

@injectable()
export class LoginUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(email: string, password: string): Promise<ILoginUser> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Usuário e/ou senha inválidos');
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error('Usuário e/ou senha inválidos');
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1d'
      }
    );

    const newUser: Partial<IUserDTO> = user;
    delete newUser.password;

    return { user: newUser, token };
  }
}
