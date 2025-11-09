//+LIBS
const moment = require('moment');
const jwt = require('jsonwebtoken');
const Path = require('path');
//+UTILS
const LogManager = require('../utils/logger/loggerFormat');
const constants = require('../utils/constants');
const logger = require('../utils/logger/loggerConfig');
//+VARS
let filename = '' + Path.basename(__filename);

module.exports = {
  printLog: (uuid, isStarting, apiType, path, initDate = null) => {
    const status = isStarting ? 'Starting' : 'Ending';
    const newDate = moment();
    const diff = initDate
      ? ` :: Execution in ${newDate.diff(initDate, 'seconds', true)} seconds`
      : '';
    logger.info(
      `:: ${uuid} :: ========== ${status} API ${apiType} "${path}" ${diff} ==========`
    );
    return newDate;
  },
  initLogManager: (req) => {
    const logManager = new LogManager();
    logManager.resetUUID();
    logManager.setMethod(req.method.toUpperCase());
    logManager.setUrl(req.path);
    return logManager;
  },
  validateTokenOauth: async (req, logManager, token, publicKey) => {
    let function_name = 'validateTokenOauth';
    try {
      const credentials = { token };
      let artifacts = {};
      let message;
      let user;
      logManager.printDebug(
        `Validating the token for access with jwt`,
        filename,
        function_name
      );
      //use jwt.verify for a validate token
      let tokenDecode = jwt.verify(req.auth.token, publicKey, {
        algorithms: ['RS512']
      });
      if (tokenDecode.user_id) {
        //this is a valid user id?
        user = tokenDecode.user_id;
        //validate user with user in db?
        artifacts = { user };
        message = `The user active`;
        return {
          isValid: true,
          credentials: credentials,
          artifacts: artifacts,
          message: message
        };
      } else {
        //is an invalid token
        user = 'undefined';
        artifacts = { user };
        message = `Invalid Credentials`;
        logManager.printError(constants.RESPONSE_MESSAGE_ERROR, {
          message: message
        });
        return {
          isValid: false,
          credentials: credentials,
          artifacts: artifacts,
          message: message
        };
      }
    } catch (e) {
      logManager.printError(e);
      return {
        isValid: false,
        credentials: null,
        artifacts: null,
        error: e.message
      };
    }
  }
};
