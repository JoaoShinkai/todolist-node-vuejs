import { AuthController } from '@modules/auth/AuthController';
import createUserSchema from '@modules/user/schema/create-user.schema';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const userRoutes = Router();
const userController = new UserController();
const authController = new AuthController();

userRoutes.post(
  '/',
  celebrate({ [Segments.BODY]: createUserSchema }),
  userController.create
);

userRoutes.post('/login', userController.login);
userRoutes.post('/authenticate', authController.VerifyToken);

export { userRoutes };
