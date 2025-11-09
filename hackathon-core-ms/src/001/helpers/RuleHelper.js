//+UTILS
const constants = require(process.env.UTILS_PATH + 'constants');

const createRule = async (uuid, rule, logManager) => {
  try {
    logManager.printInfo(`:: ${uuid} :: Building rule`);
    let ruleStructure = {};
    rule = rule.map((evaluation) => {
      let field = constants.EVALUATION_FIELDS[evaluation.elementData.field];
      let action = evaluation.elementData.action;
      let value = evaluation.elementData.value;
      let channels = evaluation.elementData.channels;

      if (!(field in ruleStructure)) ruleStructure[field] = {};

      let evaluationParameter = createEvaluation(
        uuid,
        field,
        action,
        value,
        channels
      );
      const [[requirementType, logicalAssertion]] =
        Object.entries(evaluationParameter);
      ruleStructure[field][requirementType] = { ...logicalAssertion };
    });

    logManager.printInfo(`:: ${uuid} :: Rule structure created`);

    return ruleStructure;
  } catch (e) {
    logger.printError(
      `:: ${uuid} :: ${constants.RESPONSE_MESSAGE_ERROR} :: ${e.message}`
    );
    return null;
  }
};

const createEvaluation = (uuid, field, action, value, channels, logManager) => {
  let requirementType = '';
  let logicalAssertion = '';
  let rule = {};

  if (field.includes('range')) {
    requirementType = 'range';
    switch (action) {
      case '!=': // RANGO FUERA DE
        logicalAssertion = 'out';
        break;
      case '=': // RANGO DENTRO DE
        logicalAssertion = 'in';
        break;
      default:
        logManager.info(`:: ${uuid} :: Action not supported by range`);
        break;
    }
    rule[requirementType] = {
      [`${logicalAssertion}`]: { start: value[0], end: value[1] },
      channels
    };
  } else {
    if (typeof value == 'object' && action == '=') {
      requirementType = 'should';
    } else if (typeof value == 'object' && action == '!=') {
      requirementType = 'should_not';
    } else if (action == '!=') {
      requirementType = 'must_not';
    } else {
      requirementType = 'must';
    }

    rule[requirementType] = {
      [`${constants.ACTIONS[action]}`]: value,
      channels
    };
  }

  return rule;
};
module.exports = { createRule, createEvaluation };
