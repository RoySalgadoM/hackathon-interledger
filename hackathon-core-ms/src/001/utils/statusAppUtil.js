const constants = require(process.env.UTILS_PATH + 'constants');
const version = '1.0.3';

module.exports = {
  getStatusApp: function () {
    return constants.STATUS_APP.replace('VERSION', version);
  },

  getVersionApp: function () {
    return version;
  }
};
