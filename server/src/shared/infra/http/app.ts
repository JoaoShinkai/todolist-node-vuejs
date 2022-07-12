import '@shared/container';
import express from 'express';
import '../typeorm';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(routes);

export { app };
