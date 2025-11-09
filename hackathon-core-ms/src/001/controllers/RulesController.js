//+LIBS
const moment = require('moment');
const Joi = require(process.env.NODE_LIBS_PATH + 'joi');

//+UTILS
const constants = require(process.env.UTILS_PATH + 'constants');
const util = require(process.env.UTILS_PATH + 'util');
const responseUtil = require(process.env.UTILS_PATH + 'responseMessages');

//+SERVICES
const { rulesService } = require('../services/index');

module.exports = [
  {
    method: constants.POST,
    path: `${process.env.CONTEXT_API}/rules`,
    config: {
      description: 'Evaluar una transaccion',
      notes: ['Core', 'Evaluation'],
      tags: [constants.API],
      validate: {
        payload: Joi.object({
          name: Joi.string().allow(null).allow(''),
          description: Joi.string().allow(null).allow(''),
          wallets: Joi.array(),
          structure: Joi.array().required()
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
        const response = await rulesService.createRule(
          req,
          req.logManager.getUUID()
        );
        //{ result: '' };
        logManager.endProcess(req, initDate);
        return h.response(response);
      } catch (error) {
        let response = await responseUtil.generateResponseError(req, error);
        return h.response(response).code(600);
      }
    }
  },
  {
    method: constants.GET,
    path: `${process.env.CONTEXT_API}/rules`,
    config: {
      description: 'Get all rules',
      notes: ['Get', 'Rules'],
      tags: [constants.API],
      validate: {
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
        const response = await rulesService.getRules(
          req,
          req.logManager.getUUID()
        );
        //{ result: '' };
        logManager.endProcess(req, initDate);
        return h.response(response);
      } catch (error) {
        let response = await responseUtil.generateResponseError(req, error);
        return h.response(response).code(600);
      }
    }
  }
];
