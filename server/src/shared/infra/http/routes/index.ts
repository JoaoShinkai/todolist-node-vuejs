import { schedulingRoutes } from '@modules/scheduling/infra/http/routes/scheduling.routes';
import { userRoutes } from '@modules/user/infra/http/routes/user.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/scheduling', schedulingRoutes);

export { routes };
