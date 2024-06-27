import { NextApiResponse } from 'next';
import { AppError, handleError } from '../../services/errorHandlingService';
import { createMocks } from 'node-mocks-http';

describe('Error Handling Service', () => {
  test('handleError should return error message for AppError', () => {
    const { res } = createMocks();
    const error = new AppError('Test error', 400);
    handleError(error, res as unknown as NextApiResponse);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({
      status: 'error',
      message: 'Test error',
    });
  });

  test('handleError should return default message for unknown error', () => {
    const { res } = createMocks();
    const error = new Error('Unknown error');
    handleError(error, res as unknown as NextApiResponse);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({
      status: 'error',
      message: 'Something went very wrong!',
    });
  });
});