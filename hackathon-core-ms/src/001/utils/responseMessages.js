module.exports = {
  generateResponse: async (req, response) => {
    try {
      if (response?.statusCode) {
        switch (response.statusCode) {
          case 200:
            return await generateResponseOk(req, response.body);
          case 400:
            return await generateResponseBadRequest(
              req,
              response?.body?.Errors || null
            );
          case 401:
            return await generateResponseUnauthorized(
              req,
              response?.body?.Errors || null
            );
          default:
            return await generateResponseError(
              req,
              response?.body?.Errors || null
            );
        }
      }

      return await generateResponseError(req, JSON.stringify(response));
    } catch (error) {
      return await generateResponseError(req, error.message);
    }
  },

  generateResponseFailAction: async (req, failAction) => {
    try {
      switch (failAction.output.statusCode) {
        case 400: {
          const messageTitle = failAction.data?.defaultError?.message;
          const messageDetail = failAction.message;

          const message = messageTitle
            ? `${messageTitle}: ${messageDetail}`
            : messageDetail;
          return await generateResponseBadRequest(req, message);
        }
        case 401:
          return await generateResponseUnauthorized(req);
        default:
          return await generateResponseError(req);
      }
    } catch (error) {
      return await generateResponseError(req, error.message);
    }
  },

  generateResponseOk: async (
    req,
    responseData,
    message = null,
    success = true,
    error = null,
    sendToProcess = null
  ) => {
    return await generateResponseOk(
      req,
      responseData,
      message,
      success,
      error,
      sendToProcess
    );
  },

  generateResponseBadRequest: async (req, message = null) => {
    return await generateResponseBadRequest(req, message);
  },

  generateResponseUnauthorized: async (req, message = null) => {
    return await generateResponseUnauthorized(req, message);
  },

  generateResponseNotFound: async (req, message = null) => {
    return await generateResponseNotFound(req, message);
  },

  generateResponseConflict: async (req, message = null) => {
    return await generateResponseConflict(req, message);
  },

  generateResponseError: async (req, message = null) => {
    return await generateResponseError(req, message);
  }
};

const generateResponseOk = async (
  req,
  responseData,
  message = null,
  success = true,
  error = null,
  sendToProcess = null
) => {
  const logManager = req.logManager;
  let detail = {
    success: success || true,
    message: message || 'The request was processed successfully'
  };

  if (sendToProcess != null) {
    detail.sendToProcess = sendToProcess;
  }

  if (responseData) {
    detail.data = responseData;
  }

  if (error) {
    detail.error = error;
  }

  return {
    code: 200,
    message: 'OK',
    idRequest: logManager.getUUID(),
    detail
  };
};

const generateResponseBadRequest = async (req, message = null) => {
  const logManager = req.logManager;

  return {
    code: 400,
    message: 'Bad Request',
    idRequest: logManager.getUUID(),
    detail: message || 'Please check the request parameters and try again'
  };
};

const generateResponseUnauthorized = async (req, message = null) => {
  const logManager = req.logManager;

  return {
    code: 401,
    message: 'Unauthorized',
    idRequest: logManager.getUUID(),
    detail: message || 'Please provide a valid token'
  };
};

const generateResponseNotFound = async (req, message = null) => {
  const logManager = req.logManager;

  return {
    code: 404,
    message: 'Not Found',
    idRequest: logManager.getUUID(),
    detail: message || 'No records found for the given criteria'
  };
};

const generateResponseConflict = async (req, message = null) => {
  const logManager = req.logManager;

  return {
    code: 409,
    message: 'Conflict',
    idRequest: logManager.getUUID(),
    detail:
      message ||
      'The request could not be completed due to a conflict with the current state of the resource'
  };
};

const generateResponseError = async (req, message = null) => {
  const logManager = req.logManager;
  return {
    code: 600,
    message: 'Internal Server Error',
    idRequest: logManager.getUUID(),
    detail: message || `Please try again later or contact support`
  };
};
