import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { env } from '../shared/config/env';
import { AppDataSource } from '../infrastructure/database/data-source';
import postsRoutes from '../posts/infrastructure/http/express/posts.routes';
import { errorHandler } from '../shared/http/errors';

const logger = pino();
const app = express();

app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

app.use('/api/v1/posts', postsRoutes);
app.use(errorHandler);

AppDataSource.initialize().then(() => {
  app.listen(env.port, () => {
    logger.info(`HTTP server running on :${env.port}`);
  });
});
