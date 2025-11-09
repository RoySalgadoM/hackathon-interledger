const constants = require('../utils/constants');
const version = '1.0.3';

module.exports = {
  getStatusApp: function () {
    return constants.STATUS_APP.replace('VERSION', version);
  },

  getVersionApp: function () {
    return version;
  }
};
