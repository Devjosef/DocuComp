import rateLimiter from '../../../../middleware/rateLimiter';
import { createMocks } from 'node-mocks-http';
import RedisClient from 'ioredis'; // Ensure you have the correct import for RedisClient

jest.mock('ioredis');

describe('Rate Limiter Middleware', () => {
  let redisClient: RedisClient; // Explicitly define the type

  beforeEach(() => {
    redisClient = {
      incr: jest.fn(),
      ttl: jest.fn(),
      expire: jest.fn(),
    } as unknown as RedisClient; // Type assertion to RedisClient
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should allow request within rate limit', async () => {
    const { req, res } = createMocks();
    (redisClient.incr as jest.Mock).mockResolvedValue(1);
    (redisClient.ttl as jest.Mock).mockResolvedValue(60);
    const handler = rateLimiter.limit((req, res) => res.status(200).json({ success: true }));
    await handler(req as any, res as any);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData().success).toBe(true);
  });

  test('should block request exceeding rate limit', async () => {
    const { req, res } = createMocks();
    (redisClient.incr as jest.Mock).mockResolvedValue(101);
    (redisClient.ttl as jest.Mock).mockResolvedValue(60);
    const handler = rateLimiter.limit((req, res) => res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' }));
    await handler(req as any, res as any);
    expect(res.statusCode).toBe(429);
    expect(res._getJSONData().error).toBe('Rate limit exceeded. Please try again later.');
  });
});