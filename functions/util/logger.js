const { logger } = require("firebase-functions");
const { inspect } = require("util");

module.exports = {
  info: logger.info,
  error: logger.error,
  warn: logger.warn,
  write: logger.write,
  debug: logger.debug,
  log: logger.log,

  stringify: (obj, depth, lineLength) =>
    inspect(obj, {
      depth: depth || Infinity,
      breakLength: lineLength || Infinity,
      compact: true,
    }),
};
