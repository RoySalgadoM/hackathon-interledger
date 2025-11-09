export const RESPONSE_CODES = {
  // Success codes
  SUCCESS: 'EXO0001',
  FAIL: 'EXO04367',

  // Client error codes
  BAD_REQUEST: 'EXO00400',
  UNAUTHORIZED: 'EXO00401',
  FORBIDDEN: 'EXO00403',
  NOT_FOUND: 'EXO00404',
  CONFLICT: 'EXO00409',

  // Server error codes
  INTERNAL_SERVER_ERROR: 'EXO00500',
  SERVICE_UNAVAILABLE: 'EXO00503',
  GATEWAY_TIMEOUT: 'EXO00504',
  NETWORK_ERROR: 'EXO00599',
  REDIRECT: 'EXO00302'
} as const;

export const RESPONSE_MESSAGES = {
  SUCCESS: 'Request processed successfully',
  ERROR: 'Error processing request',
  BAD_REQUEST: 'Bad request',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  NOT_FOUND: 'Resource not found',
  CONFLICT: 'Resource conflict',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  SERVICE_UNAVAILABLE: 'Service unavailable',
  GATEWAY_TIMEOUT: 'Gateway timeout',
  NETWORK_ERROR: 'Network error',
  VALIDATION_ERROR: 'Validation error',
  TOO_MANY_REQUESTS: 'Too many requests',
  DATABASE_ERROR: 'Database error',
  AUTHENTICATION_ERROR: 'Authentication error',
  AUTHORIZATION_ERROR: 'Authorization error'
} as const;
