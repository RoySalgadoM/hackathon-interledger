const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const logger = require('./loggerConfig');
const constants = require('../constants');
const { loggerSchemas } = require('../../schemas/index');

module.exports = class LogManager {
  constructor() {
    this.uuid = uuidv4();
  }

  getUUID() {
    return this.uuid;
  }

  getUrl() {
    return this.url;
  }

  getMethod() {
    return this.method;
  }

  setMethod(method) {
    this.method = method;
  }

  setUrl(url) {
    this.url = url;
  }

  resetUUID() {
    this.uuid = uuidv4();
  }

  resetUrl() {
    this.url = '';
  }

  resetMethod() {
    this.method = '';
  }

  startAuth(req) {
    this.initDate = moment();
    const path = `${req.method.toUpperCase()} - ${req.url.href}`;
    const message = `:: ${this.uuid} :: ========== Starting authentication for API ${constants.API_REST} "${path}" ==========`;
    logger.info(message);
    return this.initDate;
  }

  endAuth(req, initDate) {
    const newDate = moment();
    const path = `${req.method.toUpperCase()} - ${req.url.href}`;
    const diff = initDate
      ? ` :: Execution in ${newDate.diff(initDate, 'seconds', true)} seconds`
      : '';
    const message = `:: ${this.uuid} :: ========== Ending authentication for API ${constants.API_REST} "${path}" ${diff} ==========`;
    logger.info(message);
  }

  startProcess(req) {
    this.initDate = moment();
    const path = `${req.method.toUpperCase()} - ${req.url.href}`;
    const message = `:: ${this.uuid} :: ========== Starting API ${constants.API_REST} "${path}" ==========`;
    logger.info(message);
    return this.initDate;
  }

  endProcess(req, initDate) {
    const newDate = moment();
    const path = `${req.method.toUpperCase()} - ${req.url.href}`;
    const diff = initDate
      ? ` :: Execution in ${newDate.diff(initDate, 'seconds', true)} seconds`
      : '';
    const message = `:: ${this.uuid} :: ========== Ending API ${constants.API_REST} "${path}" ${diff} ==========`;
    logger.info(message);
  }

  printInfo(message, pathFile = '', data) {
    const logData = {
      uuid: this.uuid ? this.uuid : uuidv4(),
      message: message,
      path_file: pathFile || 'Unknown',
      data: data,
      metadata: getMetadata()
    };

    validateLogger(logData, 'info');
  }

  printDebug(message, pathFile = '', functionName = '', data) {
    const logData = {
      uuid: this.uuid ? this.uuid : uuidv4(),
      message: message || 'Debug log',
      path_file: pathFile || 'Unknown',
      function_name: functionName || 'Unknow',
      data: data,
      metadata: getMetadata()
    };

    validateLogger(logData, 'debug');
  }

  printError(message, pathFile = '', error) {
    const logData = {
      uuid: this.uuid ? this.uuid : uuidv4(),
      message: message || 'Error log',
      path_file: pathFile || 'Unknown',
      stack: error.detail
        ? error.detail
        : error.message
          ? error.message
          : 'No stack trace available',
      metadata: getMetadata()
    };
    validateLogger(logData, 'error');
  }
};

const validateLogger = (log, level = 'info') => {
  const logWithMetadata = {
    ...log,
    metadata: getMetadata()
  };

  const { error, value } = loggerSchemas.baseSchema.validate(logWithMetadata);
  if (error) {
    console.error('Validation error:', error.details);
    return;
  }

  logger[level](value);
};

const getMetadata = () => {
  return {
    version: process.env.APP_VERSION || '1.0.0',
    env: process.env.NODE_ENV || 'development',
    resource_type: process.env.RESOURCE_TYPE || 'backend',
    app: process.env.NAME_PROJECT || 'app-name'
  };
};
