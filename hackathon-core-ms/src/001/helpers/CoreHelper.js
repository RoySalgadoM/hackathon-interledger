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
    default:
      break;
  }
  return true;
};

const evalRequirementType = (requirement) => {
  let requirementType = getRequirementType(requirement);
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
      if (comparatorEvaluation) {
        return result;
      } else {
        result.code = '101';
        result.message = 'DAY NOT PERMITED';
        result.rejected = true;
        return result;
      }
    case 'should_not':
      if (!comparatorEvaluation) {
        return result;
      } else {
        result.code = '101';
        result.message = 'DAY NOT PERMITED';
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

module.exports = { evaluateDays };
