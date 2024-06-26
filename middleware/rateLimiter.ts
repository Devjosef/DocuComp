import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';
import Redis from 'ioredis';

// Interface for rate limit options
interface RateLimitOptions {
    windowMs: number;  // Time window in milliseconds
    maxRequests: number;  // Maximum number of requests allowed during the window
}

// RedisRateLimiter class handles rate limiting using Redis
class RedisRateLimiter {
    private redisClient: Redis;

    // Constructor initializes the Redis client and rate limit options
    constructor(redisClient: Redis, private options: RateLimitOptions) {
        this.redisClient = redisClient;
    }

    // Middleware function to limit the number of requests an IP can make within a window
    limit = (handler: NextApiHandler): NextApiHandler => {
        return async (req: NextApiRequest, res: NextApiResponse) => {
            const ip = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress as string;
            const key = `rate-limit:${ip}`;
            const current = await this.redisClient.incr(key);

            if (current === 1) {
                // Set the key with expiration only on the first request
                await this.redisClient.expire(key, this.options.windowMs / 1000);
            }

            const ttl = await this.redisClient.ttl(key);
            res.setHeader('X-RateLimit-Limit', this.options.maxRequests);
            res.setHeader('X-RateLimit-Remaining', Math.max(this.options.maxRequests - current, 0));
            res.setHeader('X-RateLimit-Reset', Math.ceil(Date.now() / 1000) + ttl);

            if (current > this.options.maxRequests) {
                res.status(429).json({
                    error: "You have used up all your tries. Please try again later."
                });
                return;
            }

            await handler(req, res);
        };
    }
}

// Initialize Redis client and rate limiter with dependency injection
const redisClient = new Redis(); // Configure Redis connection as necessary
const rateLimiter = new RedisRateLimiter(redisClient, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100 // limit each IP to 100 requests per windowMs
});

export default rateLimiter;
