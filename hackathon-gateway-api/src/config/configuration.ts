export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || 'localhost',
  environment: process.env.ENVIRONMENT || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  logFormat: process.env.LOG_FORMAT || 'raw',

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

  // Microservices URLs
  microservices: {
    administrationMsUrl:
      process.env.ADMINISTRATION_MS_URL,
    visorMsUrl: process.env.PREAUTH_MS_URL,
  },

  // API Configuration
  api: {
    context: process.env.CONTEXT_API || '/api/v1',
    name: process.env.NAME_PROJECT || 'API Gateway'
  },

  // Plugins
  plugins: {
    path: process.env.PLUGINS_PATH || './src/001/plugins'
  }
});
