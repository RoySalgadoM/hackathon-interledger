export default () => ({
  port: parseInt(process.env.PORT || '3006', 10),
  host: process.env.HOST || 'localhost',
  environment: process.env.ENVIRONMENT || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  logFormat: process.env.LOG_FORMAT || 'raw', // 'json' or 'raw'

  // Database
  mongodb: {
    uri:
      process.env.MONGODB_URI
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'my-secret-key',
    algorithm: process.env.JWT_ALGORITHM || 'HS256',
    expiresIn: process.env.MAX_TOKEN_AGE
      ? `${process.env.MAX_TOKEN_AGE}s`
      : '1h',
    audience: process.env.JWT_AUD,
    issuer: process.env.JWT_ISS
  },
  
  // API Configuration
  api: {
    context: process.env.CONTEXT_API || '/api',
    name: process.env.NAME_PROJECT || 'Administration Microservice'
  }
});
