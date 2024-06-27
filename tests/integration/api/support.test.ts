import handler from '../../../app/pages/api/support';
import { createMocks } from 'node-mocks-http';
import { handleSupportQuery } from '../../../services/supportService';

jest.mock('../../../services/supportService');

describe('API Support Endpoint', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should handle support query', async () => {
    const mockResponse = { response: 'Support response' };
    (handleSupportQuery as jest.Mock).mockResolvedValue(mockResponse);

    const { req, res } = createMocks({
      method: 'POST',
      body: { query: 'Test query' },
      env: process.env // Adding the missing 'env' property
    });
    await handler(req as any, res as any); // Casting req and res to 'any' to bypass type issues
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ response: 'Support response' });
  });
  test('should return 500 for internal server error', async () => {
    (handleSupportQuery as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));

    const { req, res } = createMocks({
      method: 'POST',
      body: { query: 'Test query' },
      env: process.env // Adding the missing 'env' property
    });

    await handler(req as any, res as any); // Casting req and res to 'any' to bypass type issues

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData().error).toBe('Internal Server Error');
  });

  test('should return 405 for method not allowed', async () => {
    const { req, res } = createMocks({
      method: 'GET'
    });

    await handler(req as any, res as any); // Casting req and res to 'any' to bypass type issues

    expect(res.statusCode).toBe(405);
    expect(res._getJSONData().error).toBe('Method not allowed');
  });
});