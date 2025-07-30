import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let redis: Redis | null = null;
let ratelimit: Ratelimit | null = null;

// Only initialize Upstash Redis and the rate limiter if the environment variables are set.
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, '10 s'),
    analytics: true,
  });
} else {
  console.warn('Upstash Redis environment variables not found. Rate limiting is disabled.');
}

// Export a single function that handles both cases.
export const rateLimiter = {
  limit: async (identifier: string) => {
    if (ratelimit) {
      return await ratelimit.limit(identifier);
    }
    // If the rate limiter is not configured, always allow the request.
    return {
      success: true,
      pending: Promise.resolve(),
      limit: 0,
      reset: 0,
      remaining: 0,
    };
  },
};