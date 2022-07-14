import { CreateSchedulingService } from '@modules/scheduling/services/CreateSchedulingService';
import { ListOlderSchedulingService } from '@modules/scheduling/services/ListOlderSchedulingService';
import { ListSchedulingService } from '@modules/scheduling/services/ListSchedulingService';
import SendMailSchedulingService from '@modules/scheduling/services/SendMailSchedulingService';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export class SchedulingController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = req.body;
      const service = container.resolve(CreateSchedulingService);
      const sendMailService = container.resolve(SendMailSchedulingService);

      const schedule = await service.execute(data);

      res.json(await sendMailService.execute(schedule));
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req;

      const service = container.resolve(ListSchedulingService);

      res.json(await service.execute(userId));
    } catch (err) {
      next(err);
    }
  }

  async listOlder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req;

      const service = container.resolve(ListOlderSchedulingService);

      res.json(await service.execute(userId));
    } catch (err) {
      next(err);
    }
  }
}
