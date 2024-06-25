import rateLimiter from '../../../../middleware/rateLimiter';
import { createMocks } from 'node-mocks-http';
import Redis from 'ioredis';

jest.mock('ioredis');

describe('Rate Limiter Middleware', () => {
  let redisClient;

  beforeEach(() => {
    redisClient = new Redis();
    redisClient.incr = jest.fn();
    redisClient.expire = jest.fn();
    redisClient.ttl = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should allow request within rate limit', async () => {
    const { req, res } = createMocks();
    redisClient.incr.mockResolvedValue(1);
    redisClient.ttl.mockResolvedValue(60);
    const handler = rateLimiter.limit((req, res) => res.status(200).json({ success: true }));
    await handler(req as any, res as any);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData().success).toBe(true);

  test('should block request exceeding rate limit', async () => {
    const { req, res } = createMocks();
    redisClient.incr.mockResolvedValue(101);
    redisClient.ttl.mockResolvedValue(60);
    const handler = rateLimiter.limit((req, res) => res.status(200).json({ success: true }));
    await handler(req as any, res as any);

    expect(res.statusCode).toBe(429);
    expect(res._getJSONData().error).toBe('Rate limit exceeded. Please try again later.');
  });
  });
});
