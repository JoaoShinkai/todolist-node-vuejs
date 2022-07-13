import createSchedulingSchema from '@modules/scheduling/schemas/create-scheduling.schema';
import userAuth from '@shared/infra/http/middlewares/userAuth';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import { SchedulingController } from '../controllers/SchedulingController';

const schedulingRoutes = Router();
const schedulingController = new SchedulingController();

schedulingRoutes.post(
  '/',
  celebrate({ [Segments.BODY]: createSchedulingSchema }),
  userAuth,
  schedulingController.create
);

schedulingRoutes.get('/', userAuth, schedulingController.list);

export { schedulingRoutes };
