import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';        
import Redis from 'ioredis';

const redis = new Redis(); // Configure Redis connection as necessary

interface RateLimitOptions {
    windowMs: number;  // Time window in milliseconds
    maxRequests: number;  // Maximum number of requests allowed during the window
}

class RedisRateLimiter {
    constructor(private options: RateLimitOptions) {}

    async limit(handler: NextApiHandler): Promise<NextApiHandler> {
        return async (req: NextApiRequest, res: NextApiResponse) => {
            const ip = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress as string;
            const key = `rate-limit:${ip}`;
            const current = await redis.incr(key);

            if (current === 1) {
                // Set the key with expiration only on the first request
                await redis.expire(key, this.options.windowMs / 1000);
            }

            const ttl = await redis.ttl(key);
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

const rateLimiter = new RedisRateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100 // limit each IP to 100 requests per windowMs
});

export default rateLimiter;
