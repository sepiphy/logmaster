'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LogMaster;
function LogMaster(config) {
  var LEVEL_DEBUG = 0;
  var LEVEL_INFO = 1;
  var LEVEL_NOTICE = 2;
  var LEVEL_WARN = 3;
  var LEVEL_ERROR = 4;

  config = config || {};

  var channelName = config.default || 'console';

  var minLevelStr = 'DEBUG';

  if (config.channels && config.channels[channelName] && config.channels[channelName].level) {
    minLevelStr = config.channels[channelName].level;
  }

  var minLevel = getLevel(minLevelStr);

  var levelNames = ['DEBUG', 'INFO', 'NOTICE', 'WARN', 'ERROR'];

  async function debug(message, context) {
    log(LEVEL_DEBUG, message, context);
  }

  async function info(message, context) {
    log(lEVEL_INFO, message, context);
  }

  async function notice(message, context) {
    log(LEVEL_NOTICE, message, context);
  }

  async function warn(message, context) {
    log(LEVEL_WARN, message, context);
  }

  async function error(message, context) {
    log(LEVEL_ERROR, message, context);
  }

  function getLevelName(level) {
    return levelNames[level];
  }

  function getLevel(levelName) {
    if (levelName.toUpperCase() === 'DEBUG') {
      return 0;
    } else if (levelName.toUpperCase() === 'INFO') {
      return 1;
    } else if (levelName.toUpperCase() === 'NOTICE') {
      return 2;
    } else if (levelName.toUpperCase() === 'WARN') {
      return 3;
    } else if (levelName.toUpperCase() === 'ERROR') {
      return 4;
    }

    return 0;
  }

  async function log(level, message, context) {
    if (level < minLevel) {
      return;
    }
    var now = new Date();
    var levelName = getLevelName(level);
    if (context === undefined || context === null) {
      console.log('[' + now.toDateString() + '] ' + levelName + ' ' + message);
    } else {
      console.log('[' + now.toDateString() + '] ' + levelName + ' ' + message, context);
    }
  }

  return {
    debug: debug, info: info, notice: notice, warn: warn, error: error
  };
}