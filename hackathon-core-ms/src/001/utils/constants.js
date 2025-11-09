module.exports = {
  STATUS_APP: process.env.NAME_PROJECT + ' API vVERSION is up and running!',
  API_REST: 'REST',
  GET: 'GET',
  POST: 'POST',
  API: 'api',
  DATE_FORMAT: 'DD/MM/YYYY',
  RESPONSE_MESSAGE_ERROR: 'An error occurred while processing the request',
  RESPONSE_MESSAGE_PERMISSION: 'You do not have permission to use this service',
  ERROR_RESPONSE: {
    code: '600',
    message: '',
    idRequest: '',
    data: {
      success: false,
      detail: '',
      errors: ''
    }
  },
  RESPONSE_CODE_SUCCESS: 'EXO0001',
  RESPONSE_MESSAGE_SUCCESS: 'Success',
  RESPONSE_CODE_FAIL: 'EXO04367',
  RESPONSE_CODE_ERROR: 'EXO00500',
  RESPONSE_CODE_NOTFOUND: 'EXO00404',
  RESPONSE_MESSAGE_FAIL: 'Fail',
  EVALUATION_FIELDS: [
    'amount',
    'range_amount',
    'days',
    'range_hour',
    'accumulates',
    'tx_accumulates',
    'whitelist'
  ],
  ACTIONS: {
    '<': 'lt',
    '>': 'gt',
    '=': 'match',
    '>=': 'gte',
    '<=': 'lte',
    '!=': 'match'
  }
};
