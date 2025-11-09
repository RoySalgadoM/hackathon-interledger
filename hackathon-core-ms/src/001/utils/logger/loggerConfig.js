//+LIBS
const { createLogger, format, transports } = require(
  process.env.NODE_LIBS_PATH + 'winston'
);
//+VARS
const { combine, timestamp, printf, errors, colorize, align } = format;
const pjson = require(process.env.SYSTEM_PATH + 'package.json');
const version = pjson.version;
// const customFormat = () => {
//   const formatter = (info) => {
//     const logEntry = {
//       timestamp: info.timestamp,
//       level: info.level,
//       uuid: info.uuid,
//       message: info.message,
//       ...(info.stack && { stack: info.stack }),
//       ...info
//     };
//     return JSON.stringify(logEntry);
//   };
//   return printf(formatter);
// };

// function customFormatConsole() {
//   const formatMessage = (info) => {
//     let { level, timestamp, ...data } = info; //level y timestamp estan declarados para eliminarlos del objeto original de info
//     let log = `${timestamp} ${level} ${JSON.stringify(data)}`;
//     return log;
//   };

//   const formatError = (info) =>
//     `${info.timestamp} ${info.level} ${JSON.stringify(info)}\n\n${info.stack}\n`;
//   const formatter = (info) =>
//     info instanceof Error ? formatError(info) : formatMessage(info);
//   return combine(colorize(), printf(formatter));
// }

// let process_name =
//   process.env.PROCESS_NAME !== undefined
//     ? process.env.PROCESS_NAME
//     : 'starting_app';
// const logger = createLogger({
//   format: combine(
//     timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS' }),
//     errors({ stack: true })
//   ),
//   transports: [
//     new transports.Console({
//       format: combine(customFormatConsole())
//     }),
//     new transports.File({
//       filename: process.env.LOG_PATH + '/' + process_name + '.log', // Nombre del archivo donde se guardan los logs
//       format: combine(
//         timestamp(), // Agregar un timestamp a los logs
//         customFormat() // Formato JSON para los logs en archivo
//       )
//     })
//   ],
//   exitOnError: false
// });
// module.exports = logger;

const customFormat = () => {
  const formatter = (info) => {
    const logEntry = {
      timestamp: info.timestamp,
      level: info.level,
      uuid: info.uuid,
      message: info.message,
      ...(info.stack && { stack: info.stack }),
      ...info
    };
    return JSON.stringify(logEntry);
  };
  return printf(formatter);
};

function customFormatConsole() {
  const formatMessage = (info) => {
    let {
      level,
      uuid,
      message,
      label,
      timestamp,
      data,
      path_file,
      function_name,
      metadata,
      stack
    } = info; //level y timestamp estan declarados para eliminarlos del objeto original de info

    let log = `[ ${timestamp} | ${level} | ${version} ] | [${
      uuid || 'system'
    }] ${message} | `;
    if (path_file) {
      log = log + `path file: ${path_file} | `;
    }
    if (function_name) {
      log = log + `function: ${function_name} | `;
    }
    if (data) {
      log = log + `data: ${JSON.stringify(data)} | `;
    }
    if (stack) {
      log = log + `stack: ${stack} `;
    }

    return log;
  };

  const formatter = (info) => (info ? formatMessage(info) : 0);
  return combine(align(), colorize(), printf(formatter));
}

let process_name =
  process.env.PROCESS_NAME !== undefined
    ? process.env.PROCESS_NAME
    : 'starting_app';

const logger = createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS' }),
    errors({ stack: true })
  ),
  transports: [
    new transports.Console({
      format: combine(customFormatConsole())
    }),
    new transports.File({
      filename: process.env.LOG_PATH + process_name + '.log', // Nombre del archivo donde se guardan los logs
      format: combine(
        timestamp(), // Agregar un timestamp a los logs
        customFormat() // Formato JSON para los logs en archivo
      )
    })
  ],
  exitOnError: false
});
module.exports = logger;
