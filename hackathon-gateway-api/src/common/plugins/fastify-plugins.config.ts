import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';

/**
 * Configuration for Fastify plugins
 * Centralized plugin management for better maintainability
 */
export class FastifyPluginsConfig {
  /**
   * Register all security-related plugins
   */
  static async registerSecurityPlugins(app: any): Promise<void> {
    // Helmet for security headers
    await app.register(helmet as any, {
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false
    });

    // CORS configuration
    await app.register(cors as any, {
      origin: (origin, callback) => {
        // Allow all origins in development, restrict in production
        if (process.env.NODE_ENV === 'development' || !origin) {
          callback(null, true);
          return;
        }

        const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['*'];
        if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'), false);
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID']
    });

    // Rate limiting
    await app.register(rateLimit as any, {
      max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
      timeWindow: process.env.RATE_LIMIT_WINDOW || '1 minute',
      keyGenerator: (request) => {
        // Rate limit by IP + User ID if authenticated
        const ip = request.ip;
        const userId = (request as any).user?.id;
        return userId ? `${ip}-${userId}` : ip;
      },
      errorResponseBuilder: (request, context) => {
        return {
          statusCode: 429,
          error: 'Too Many Requests',
          message: `Rate limit exceeded, retry in ${context.after}`,
          retryAfter: context.after
        };
      }
    });
  }

  /**
   * Register all utility plugins
   */
  static async registerUtilityPlugins(_app: any): Promise<void> {
    // Multipart handling is done by @nest-lab/fastify-multer
    // No need to register @fastify/multipart separately
  }

  /**
   * Register all plugins
   */
  static async registerAllPlugins(app: any): Promise<void> {
    await this.registerSecurityPlugins(app);
    await this.registerUtilityPlugins(app);
  }
}
