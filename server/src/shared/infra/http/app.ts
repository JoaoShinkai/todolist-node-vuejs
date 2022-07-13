import '@shared/container';
import { errorsHandler } from '@shared/handlers/ErrosHandler';
import cors from 'cors';
import express from 'express';
import '../typeorm';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorsHandler);

export { app };
