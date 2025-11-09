//+LIBS
const Path = require('path');
//+UTILS
const constants = require(process.env.UTILS_PATH + 'constants');
const { inspect } = require('util');
//+VARS
let filename = '' + Path.basename(__filename);

//+HELPERS
let coreHelper = require(process.env.HELPERS_PATH + 'CoreHelper');

module.exports = {
  evaluate: async function (req, uuid) {
    let logManager = req.logManager;
    let function_name = 'evaluate';
    let wallet = req.payload.wallet;
    let internalMessage = req.payload;

    internalMessage.result = {
      rejected: false,
      rule: undefined,
      message: '',
      code: '000'
    };

    logManager.printInfo(' [!] AMOUNT: ' + internalMessage.amount);
    logManager.printInfo(
      ' [!] AMOUNT FORMATTED: ' + internalMessage.amountFormatted
    );
    logManager.printInfo(' [!] TRANSACTION TIME: ' + internalMessage.time);
    logManager.printInfo(' [!] TRANSACTION DATE: ' + internalMessage.date);

    try {
      logManager.printDebug(
        `START evaluating process for wallet ` + wallet,
        filename,
        function_name
      );

      if (internalMessage.rules) {
        logManager.printInfo(
          inspect(internalMessage.rules, { depth: 10, colors: false })
        );
        for (let rule of internalMessage.rules) {
          let ruleData = rule.rule;
          logManager.printInfo('[!] EVALUATING RULE: ' + rule._id.$oid);
          logManager.printInfo(
            '[-] RULE: ' + inspect(ruleData, { depth: 4, colors: false })
          );

          if (ruleData.days) {
            internalMessage.result = coreHelper.evaluateDays(ruleData.days);
          }

          // AMOUNTS
          // if (ruleData.amount_max || ruleData.amount_min) {
          //   internalMessage = coreRules.amounts(internalMessage, ruleData);
          //   if (internalMessage.result.rejected === true) {
          //     break;
          //   }
          // }
          // TIME
          // if (ruleData.time) {
          //   internalMessage = coreRules.time(internalMessage, ruleData);
          //   if (internalMessage.result.rejected === true) {
          //     break;
          //   }
          // }
          // DAYS
        }
      } else {
        logManager.printInfo('La wallet no tiene reglas configuradas');
      }

      let response = {
        code: constants.RESPONSE_CODE_SUCCESS,
        message: 'Success',
        data: internalMessage.result,
        idRequest: this.uuid
      };

      logManager.printDebug(
        `END process in exampleBasic service`,
        filename,
        function_name,
        {}
      );

      return response;
    } catch (e) {
      logManager.printError('Error in exampleBasic', filename, e);
      throw e;
    }
  }
};
