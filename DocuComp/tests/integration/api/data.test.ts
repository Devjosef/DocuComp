import handler from '../../../app/pages/api/data';
import { createMocks } from 'node-mocks-http';
import { validateUserInput, authenticateJWT } from '../../../../middleware/security';
import rateLimiter from '../../../../middleware/rateLimiter';
import { supabase } from '../../../utils/supabaseClient';

jest.mock('../../../../middleware/security');
jest.mock('../../../../middleware/rateLimiter');
jest.mock('../../../../utils/supabaseClient');

describe('API Data Endpoint', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch data from allowed table', async () => {
    const mockData = [{ id: 1, content: 'Test Document' }];
    supabase.from('documents').select.mockResolvedValue({ data: mockData, error: null });

    const { req, res } = createMocks({
      method: 'GET',
      query: { table: 'documents' }
    });

    (validateUserInput as unknown as jest.Mock).mockImplementation((req, res, next) => next());
    (authenticateJWT as unknown as jest.Mock).mockImplementation((req, res, next) => next());
    (rateLimiter.limit as unknown as jest.Mock).mockImplementation((handler) => handler);

    await handler(req as any, res as any);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockData);
  });

  test('should return 400 for invalid input', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { table: 'invalid_table' }
    });

    (validateUserInput as unknown as jest.Mock).mockImplementation((req, res, next) => next());
    (authenticateJWT as unknown as jest.Mock).mockImplementation((req, res, next) => next());
    (rateLimiter.limit as unknown as jest.Mock).mockImplementation((handler) => handler);

    await handler(req as any, res as any);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().error).toBeDefined();
  });

  test('should return 403 for unauthorized access', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { table: 'documents' }
    });
    (validateUserInput as unknown as jest.Mock).mockImplementation((req, res, next) => next());
    (authenticateJWT as unknown as jest.Mock).mockImplementation((req, res, next) => res.status(403).json({ error: 'Forbidden' }));
    (rateLimiter.limit as unknown as jest.Mock).mockImplementation((handler) => handler);

    await handler(req as any, res as any);
    expect(res.statusCode).toBe(403);
    expect(res._getJSONData().error).toBe('Forbidden');
  });
});