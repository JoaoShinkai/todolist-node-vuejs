import { NextFunction, Request, Response } from 'express';

import { AppError } from '@shared/errors/AppError';

const errorsHandler = (
  error: Error | AppError,
  _request: Request,
  response: Response,
  _: NextFunction
): Response => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal Server Error - ${error.message}`
  });
};

export { errorsHandler };
