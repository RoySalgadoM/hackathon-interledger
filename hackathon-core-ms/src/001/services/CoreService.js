//+LIBS
const Path = require('path');
//+UTILS
const constants = require(process.env.UTILS_PATH + 'constants');
//+VARS
let filename = '' + Path.basename(__filename);

module.exports = {
  exampleBasic: async function (req) {
    let logManager = req.logManager;
    let function_name = 'exampleBasic';
    try {
      logManager.printDebug(
        `START process in exampleBasic service `,
        filename,
        function_name
      );

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
  exampleJwt: async function (req) {
    let logManager = req.logManager;
    let function_name = 'exampleJwt';
    let uuid = logManager.getUUID();
    try {
      logManager.printDebug(
        `START process in exampleJwt service`,
        filename,
        function_name
      );
      let response = {
        code: constants.RESPONSE_CODE_SUCCESS,
        message: 'Success',
        data: req.payload,
        idRequest: uuid
      };
      logManager.printDebug(
        `END process in exampleJwt service`,
        filename,
        function_name
      );
      return response;
    } catch (e) {
      logManager.printError('Error in exampleJwt', filename, e);
      throw e;
    }
  },
  getData: async function (req) {
    let logManager = req.logManager;
    const api = 'https://pokeapi.co/api/v2/pokemon/ditto';

    const params = { name: 'ditto', type: 'normal' };
    let function_name = 'getData';

    try {
      logManager.printDebug(
        `START process in detData service`,
        filename,
        function_name
      );

      logManager.printInfo('Calling external API', filename, params);

      const response = await fetch(api, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      logManager.printInfo('Response from external API', filename);
      logManager.printDebug(
        `END process in detData service`,
        filename,
        function_name
      );
      logManager.printError('Example for error message', filename, {
        message: 'error de ejemplo'
      });

      //return response;
      return { data: 'UN_DATO_DESDE_API' };
    } catch (e) {
      logManager.printError('Error in getData', filename, e);
      throw e;
    }
  }
};
