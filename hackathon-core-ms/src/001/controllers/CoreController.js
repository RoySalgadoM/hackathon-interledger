//+LIBS
const moment = require('moment');
const Joi = require(process.env.NODE_LIBS_PATH + 'joi');

//+UTILS
const constants = require(process.env.UTILS_PATH + 'constants');
const util = require(process.env.UTILS_PATH + 'util');
const responseUtil = require(process.env.UTILS_PATH + 'responseMessages');

//+SERVICES
const { coreService } = require('../services/index');

module.exports = [
  {
    method: constants.POST,
    path: `${process.env.CONTEXT_API}/evaluate`,
    config: {
      description: 'Evaluar una transaccion',
      notes: ['Core', 'Evaluation'],
      tags: [constants.API],
      validate: {
        payload: Joi.object({
          uuid: Joi.string(),
          wallet_client: Joi.string(),
          wallet_merchant: Joi.string(),
          type: Joi.string(),
          amount: Joi.string(),
          amountFormatted: Joi.string(),
          time: Joi.string(),
          date: Joi.string(),
          rules: Joi.array(),
          accumulated: Joi.object(),
          transactions: Joi.object(),
          result: Joi.object(),
          request_timestamp: Joi.date().allow(null),
          response_timestamp: Joi.date().allow(null)
        }).unknown(),
        failAction: async (req, h, err) => {
          const logManager = util.initLogManager(req);
          req.logManager = logManager;
          const initDate = logManager.startProcess(req);
          const response = await responseUtil.generateResponseFailAction(
            req,
            err
          );
          logManager.printError('Bad request', 'CoreController', response);
          logManager.endProcess(req, initDate);
          return h.response(response).code(400).takeover();
        }
      }
    },
    handler: async (req, h) => {
      let logManager = util.initLogManager(req);
      req.logManager = logManager;
      try {
        let initDate = moment();
        logManager.startProcess(req);
        const response = await coreService.evaluate(req, logManager.getUUID());
        logManager.endProcess(req, initDate);
        return h.response(response);
      } catch (error) {
        let response = await responseUtil.generateResponseError(req, error);
        return h.response(response).code(600);
      }
    }
  }
];
