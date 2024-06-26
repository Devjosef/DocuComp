import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (err: unknown, res: NextApiResponse) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

export const catchAsync = (fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void>): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await fn(req, res);
    } catch (err) {
      handleError(err, res);
    }
  };
};