// Rate limiting utility - Redis-based implementation
// Note: In production environment, replace this with actual Redis connection

interface RateLimitRecord {
  count: number;
  resetTime: number;
  windowStart: number;
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

class RateLimiter {
  private store: Map<string, RateLimitRecord>;
  private cleanupInterval: NodeJS.Timeout | null;

  constructor() {
    this.store = new Map();
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, record] of this.store.entries()) {
      if (now > record.resetTime) {
        this.store.delete(key);
      }
    }
  }

  async checkLimit(
    identifier: string,
    limit: number = 5,
    windowMs: number = 15 * 60 * 1000
  ): Promise<RateLimitResult> {
    const now = Date.now();
    const key = `rate_limit:${identifier}`;
    
    let record = this.store.get(key);
    
    // Initialize or reset if window has expired
    if (!record || now >= record.resetTime) {
      record = {
        count: 1,
        resetTime: now + windowMs,
        windowStart: now
      };
      this.store.set(key, record);
      
      return {
        success: true,
        limit,
        remaining: limit - 1,
        reset: record.resetTime
      };
    }
    
    // Check if limit exceeded
    if (record.count >= limit) {
      return {
        success: false,
        limit,
        remaining: 0,
        reset: record.resetTime,
        retryAfter: Math.ceil((record.resetTime - now) / 1000)
      };
    }
    
    // Increment count
    record.count++;
    this.store.set(key, record);
    
    return {
      success: true,
      limit,
      remaining: limit - record.count,
      reset: record.resetTime
    };
  }

  // Method for Redis integration (when available)
  async checkLimitRedis(
    identifier: string,
    limit: number = 5,
    windowMs: number = 15 * 60 * 1000
  ): Promise<RateLimitResult> {
    // TODO: Implement Redis-based rate limiting
    // This is a placeholder for future Redis integration
    
    /* Redis implementation example:
    const redis = getRedisClient();
    const key = `rate_limit:${identifier}`;
    const now = Date.now();
    const windowStart = Math.floor(now / windowMs) * windowMs;
    const expiry = windowStart + windowMs;
    
    const pipeline = redis.pipeline();
    pipeline.zremrangebyscore(key, 0, now - windowMs);
    pipeline.zcard(key);
    pipeline.zadd(key, now, `${now}-${Math.random()}`);
    pipeline.expire(key, Math.ceil(windowMs / 1000));
    
    const results = await pipeline.exec();
    const count = results[1][1] as number;
    
    if (count >= limit) {
      return {
        success: false,
        limit,
        remaining: 0,
        reset: expiry,
        retryAfter: Math.ceil((expiry - now) / 1000)
      };
    }
    
    return {
      success: true,
      limit,
      remaining: limit - count - 1,
      reset: expiry
    };
    */
    
    // Fallback to memory-based implementation
    return this.checkLimit(identifier, limit, windowMs);
  }

  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.store.clear();
  }
}

// Singleton instance
let rateLimiter: RateLimiter | null = null;

export function getRateLimiter(): RateLimiter {
  if (!rateLimiter) {
    rateLimiter = new RateLimiter();
  }
  return rateLimiter;
}

export type { RateLimitResult };
export default RateLimiter;