const evalComparator = (fieldValue, expectedValue) => {
  let comparator = Object.keys(fieldValue)[0];
  let value = fieldValue[comparator];

  switch (comparator) {
    case 'match':
      if (Array.isArray(value)) {
        return value.includes(expectedValue);
      } else {
        return value == expectedValue;
      }
    case 'gt':
      return expectedValue > value;
    case 'lt':
      return expectedValue < value;
    case 'lte':
      return expectedValue <= value;
    case 'gte':
      return expectedValue >= value;
    default:
      break;
  }
  return true;
};

const evaluateDays = (daysRequirement) => {
  let requirementType = Object.keys(daysRequirement)[0];
  let comparatorEvaluation = evalComparator(
    daysRequirement[requirementType],
    getDayOfWeek()
  );

  let result = {
    rejected: false,
    rule: undefined,
    message: '',
    code: '000'
  };
  switch (requirementType) {
    case 'should':
      if (!comparatorEvaluation) {
        return result;
      } else {
        result.code = '101';
        result.message = 'DAY NOT PERMITTED';
        result.rejected = true;
        return result;
      }
    case 'should_not':
      if (comparatorEvaluation) {
        return result;
      } else {
        result.code = '101';
        result.message = 'DAY NOT PERMITTED';
        result.rejected = true;
        return result;
      }
    default:
      break;
  }
  return true;
};

const evaluateWhitelist = (whitelistEvaluation, wallet_merchant) => {
  let requirementType = Object.keys(whitelistEvaluation)[0];
  let whitelisted = evalComparator(
    whitelistEvaluation[requirementType],
    wallet_merchant
  );

  switch (requirementType) {
    case 'should':
      return whitelisted;
    case 'should_not':
      return !whitelisted;
    default:
      break;
  }
  return true;
};

const evaluateAmounts = (amountEvaluation, transactionAmount) => {
  let requirementType = Object.keys(amountEvaluation)[0];
  let comparatorEvaluation = evalComparator(
    amountEvaluation[requirementType],
    parseFloat(transactionAmount)
  );

  let result = {
    rejected: false,
    rule: undefined,
    message: '',
    code: '000'
  };
  switch (requirementType) {
    case 'must':
      if (!comparatorEvaluation) {
        return result;
      } else {
        result.code = '102';
        result.message = 'AMOUNT NOT PERMITTED';
        result.rejected = true;
        return result;
      }
    case 'must_not':
      if (comparatorEvaluation) {
        return result;
      } else {
        result.code = '101';
        result.message = 'DAY NOT PERMITTED';
        result.rejected = true;
        return result;
      }
    default:
      break;
  }
  return true;
};

function getDayOfWeek() {
  const today = new Date();
  const jsDay = today.getDay(); // 0 = domingo, 1 = lunes, ...
  // Convertimos: lunes=1, martes=2, ..., domingo=7
  const normalizedDay = jsDay === 0 ? 7 : jsDay;
  return normalizedDay;
}

module.exports = { evaluateDays, evaluateWhitelist, evaluateAmounts };
