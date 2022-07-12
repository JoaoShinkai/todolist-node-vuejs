import createUserSchema from '@modules/user/schema/create-user.schema';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post(
  '/',
  celebrate({ [Segments.BODY]: createUserSchema }),
  userController.create
);

userRoutes.post('/login', userController.login);

export { userRoutes };
