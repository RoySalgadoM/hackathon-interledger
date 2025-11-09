/* eslint-disable no-console */
//+LIBS
const Path = require('path');
//+UTILS
const constants = require(process.env.UTILS_PATH + 'constants');
const models = require(process.env.MODELS_PATH);
//+VARS
let filename = '' + Path.basename(__filename);

//+HELPERS
let ruleHelper = require(process.env.HELPERS_PATH + 'RuleHelper');

module.exports = {
  createRule: async function (req, uuid) {
    let logManager = req.logManager;
    let function_name = 'createRule';
    const name = req.payload.name;
    const description = req.payload.description;
    const structure = req.payload.structure;
    const wallets = req.payload.wallets;

    try {
      logManager.printDebug(
        `START process creating rule`,
        filename,
        function_name
      );

      let parsedRule = await ruleHelper.createRule(
        uuid,
        structure,
        req.logManager
      );

      let ruleSave = new models.rules({
        name,
        description,
        rule: parsedRule,
        wallets,
        creationDate: new Date(),
        lastUpdate: new Date(),
        structure,
        state: true
      });

      await ruleSave.save();

      console.log('Rule Save', ruleSave);

      let response = {
        code: constants.RESPONSE_CODE_SUCCESS,
        message: 'Success',
        data: req.payload,
        idRequest: this.uuid
      };

      logManager.printDebug(
        `END process in exampleBasic service`,
        filename,
        function_name,
        response
      );

      return response;
    } catch (e) {
      logManager.printError('Error in exampleBasic', filename, e);
      throw e;
    }
  },
  getRules: async function (req, uuid) {
    let logManager = req.logManager;
    let function_name = 'getRules';

    try {
      logManager.printDebug(`START process getRules`, filename, function_name);

      const rules = await models.rules.find().select('name description state');

      let response = {
        code: constants.RESPONSE_CODE_SUCCESS,
        message: 'Success',
        data: rules,
        idRequest: this.uuid
      };

      logManager.printDebug(
        `END process in getRules service`,
        filename,
        function_name,
        response
      );

      return response;
    } catch (e) {
      logManager.printError('Error in exampleBasic', filename, e);
      throw e;
    }
  }
};
