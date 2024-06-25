import { validateUserInput } from '../../../middleware/security';
import { createMocks } from 'node-mocks-http';

describe('Input Validation Middleware', () => {
  test('should validate and sanitize input', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { username: 'testuser', email: 'test@example.com' }
    });

    await validateUserInput[0](req, res, () => {});
    await validateUserInput[1](req, res, () => {});
    await validateUserInput[2](req, res, () => {});

    expect(res.statusCode).toBe(200);
  });

  test('should return 400 for invalid input', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { username: 'invalid user!', email: 'invalid-email' }
    });

    await validateUserInput[0](req, res, () => {});
    await validateUserInput[1](req, res, () => {});
    await validateUserInput[2](req, res, () => {});

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().errors).toBeDefined();
  });
});