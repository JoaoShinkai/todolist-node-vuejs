import { CreateSchedulingService } from '@modules/scheduling/services/CreateSchedulingService';
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
}
