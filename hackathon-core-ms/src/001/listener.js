//+ LIBS
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Path = require('path');
const mongoose = require('mongoose');
//+ UTILS
const logger = require('./utils/logger/loggerConfig');
const statusAppUtil = require('./utils/StatusAppUtil');
const util = require('./utils/Util');
const responseUtil = require('./utils/responseMessages');

//+ SECURITY

//+ ROUTES
const routes = require('../001/routes/api/index');

let filename = '' + Path.basename(__filename);
process.env.APP_VERSION = statusAppUtil.getVersionApp();

if (process.env.LOG_LEVEL !== undefined) {
  logger.level = process.env.LOG_LEVEL.toLowerCase();
}

//Version
const pjson = require('../../package.json');
const version = pjson.version;
const MONGO_URI = process.env.MONGODB_URL;

function init() {
  logger.info('|---------------------------------------------------------');
  logger.info('|                    SOCRATES API MAIN                    ');
  logger.info(
    `|                       V${version}                            `
  );
  logger.info('|---------------------------------------------------------');
  logger.info('LISTENING ON HOST ' + process.env.HOST);
  logger.info('LISTENING ON PORT ' + process.env.PORT);
  logger.info('ENVIRONMENT: ' + process.env.ENVIRONMENT);
  logger.info('LOG_LEVEL  : ' + String(process.env.LOG_LEVEL));
  logger.debug('MODE DEBUG ACTIVATED');
}

const server = Hapi.server({
  port: process.env.PORT,
  host: process.env.HOST,
  app: {},
  routes: {
    cors: {
      origin: [
        'http://34.51.68.200/',
        'http://34.51.68.200',
        'http://localhost:5173'
      ],
      credentials: true
    },
    payload: { maxBytes: 52428800 },
    validate: {
      failAction: async (req, h, err) => {
        const logManager = util.initLogManager(req);
        req.logManager = logManager;
        const initDate = logManager.startProcess(req);
        const response = await responseUtil.generateResponseFailAction(
          req,
          err
        );
        logManager.printError('Bad request', filename, response);
        logManager.endProcess(req, initDate);
        return h.response(response).code(400).takeover();
      }
    }
  }
});

const startDatabases = async () => {
  await mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    })
    .then(() => {
      logger.info('[✅] MongoDB conectado correctamente');
    })
    .catch((err) => {
      logger.error('[❌] ERROR CONECTANDO A MONGODB', err);
      process.exit(1); // opcional: detiene el proceso si falla la conexión
    });
};

const startSwagger = async () => {
  const swaggerOptions = {
    info: {
      title: process.env.NAME_PROJECT,
      version: process.env.APP_VERSION
    },
    schemes: ['http', 'https'],
    sortEndpoints: 'ordered',
    grouping: 'tags',
    definitionPrefix: 'useLabel'
  };
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);
};

let gracefulShutdown = function () {
  logger.warn('[!] Received kill signal, shutting down gracefully.');
  server
    .stop({ timeout: 10000 })
    .then(function (err) {
      logger.info('[!] HAPI server stopped');
      process.exit(err ? 1 : 0);
    })
    .catch(function (err) {
      logger.error('[X] Error stopping HAPI server', err);
      process.exit(1);
    });

  setTimeout(function () {
    logger.warn(
      'Could not close connections in time, forcefully shutting down'
    );
    process.exit(0);
  }, 10 * 1000);
};

server.ext('onRequest', (request, h) => {
  const { method, path } = request;

  logger.info(`Request received: ${method.toUpperCase()} ${path}`);

  return h.continue;
});

process.on('SIGTERM', gracefulShutdown);

process.on('SIGINT', gracefulShutdown);

process.on('exit', (code) => {
  if (code === 0) {
    logger.info('[!] Cool shutdown!');
  } else {
    logger.error(`[X] Not a cool shutdown! Exit Code: ${code}`);
  }
  process.exit(1);
});

process.on('uncaughtException', function (err) {
  logger.error('Uncaught Exception:', err);
});

(async () => {
  try {
    if (process.env.LOG_LEVEL !== undefined) {
      logger.level = process.env.LOG_LEVEL.toLowerCase();
    }
    await startDatabases();
    await startSwagger();
    server.route(routes);
    await server.start();

    init();
  } catch (error) {
    logger.error({
      message: `[ERROR | STARTING LISTENER]`
    });
    logger.error(error);
    process.exit(1);
  }
})();
