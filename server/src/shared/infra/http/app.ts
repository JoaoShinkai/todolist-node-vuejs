import '@shared/container';
import cors from 'cors';
import express from 'express';
import '../typeorm';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

export { app };
