import { handleError } from '../../lib/errorHandling';

describe('Error Handling', () => {
  test('handleError should return error message', () => {
    const error = new Error('Test error');
    const result = handleError(error);
    expect(result).toBe('Test error');
  });

  test('handleError should return default message for unknown error', () => {
    const result = handleError(null);
    expect(result).toBe('An unknown error occurred');
  });
});