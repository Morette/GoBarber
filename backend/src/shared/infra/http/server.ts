import 'reflect-metadata';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';

import '@shared/infra/typeorm';
import '@shared/container';

import uploadConfig from '@config/upload';
import routes from '@shared/infra/http/routes';

import AppError from '@shared/errors/AppError';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((error: Error, request: Request, response: Response, _: NextFunction) => {
   if (error instanceof AppError) {
      return response.status(error.statusCode).json({
         status: 'error',
         message: error.message,
      });
   }

   console.error(error);

   return response.status(500).json({
      error: 'error',
      message: 'internal server error',
   });
});

const port = 8080;

app.listen(port, () => console.log(`server started on port ${port} 🚀`));
