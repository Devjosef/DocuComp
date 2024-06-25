import handler from '../../../app/pages/api/compliance';
import { createMocks } from 'node-mocks-http';
import { checkCompliance } from '../../../services/complianceService';

jest.mock('../../../services/complianceService');

describe('API Compliance Endpoint', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return compliance status', async () => {
    const mockComplianceStatus = { compliance: true };
    (checkCompliance as jest.Mock).mockResolvedValue(mockComplianceStatus);

    const { req, res } = createMocks({
      method: 'POST',
      body: { documentContent: 'Test content' }
    });
    await handler(req as any, res as any);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ complianceStatus: mockComplianceStatus });
  });

  test('should return 500 for internal server error', async () => {
    (checkCompliance as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));

    const { req, res } = createMocks({
      method: 'POST',
      body: { documentContent: 'Test content' }
    });
    await handler(req as any, res as any);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData().error).toBe('Internal Server Error');
  });

  test('should return 405 for method not allowed', async () => {
    const { req, res } = createMocks({
      method: 'GET'
    });

    await handler(req as any, res as any);

    expect(res.statusCode).toBe(405);
    expect(res._getJSONData()).toEqual({ error: 'Method Not Allowed' });
  });
});
