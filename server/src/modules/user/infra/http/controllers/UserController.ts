import { CreateUserService } from '@modules/user/services/CreateUserService';
import { LoginUserService } from '@modules/user/services/LoginUserService';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export class UserController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = req.body;
      const service = container.resolve(CreateUserService);

      res.json(await service.execute(data));
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const service = container.resolve(LoginUserService);

      res.json(await service.execute(email, password));
    } catch (err) {
      next(err);
    }
  }
}
