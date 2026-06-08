import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  if ((err as any).code === 'P2002') {
    return res.status(409).json({
      success: false,
      error: 'A record with this information already exists.',
    });
  }

  if ((err as any).code === 'P2025') {
    return res.status(404).json({
      success: false,
      error: 'Record not found.',
    });
  }

  console.error('Unhandled error:', err);

  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
};