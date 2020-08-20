import moment from "moment";

export default function LogMaster(config) {
  const LEVEL_DEBUG = 0;
  const LEVEL_INFO = 1;
  const LEVEL_NOTICE = 2;
  const LEVEL_WARN = 3;
  const LEVEL_ERROR = 4;

  let disable = false;

  config = config || {};

  const channelName = config.name || 'console';

  let minLevelStr = 'DEBUG';

  if (config.channels && config.channels[channelName] && config.channels[channelName].level) {
    minLevelStr = config.channels[channelName].level;
  }

  const minLevel = getLevel(minLevelStr);

  const levelNames = [
    'DEBUG', 'INFO', 'NOTICE', 'WARN', 'ERROR',
  ];

  async function debug(message, context) {
    log(LEVEL_DEBUG, message, context);
  }

  async function info(message, context) {
    log(LEVEL_INFO, message, context);
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

  function disableUsing(callback) {
    disable = callback();
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
    if (disable) {
      return;
    }
    if (level < minLevel) {
      return;
    }
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const levelName = getLevelName(level);
    const finalMessage = `[${dateTime}] ${channelName}.${levelName} ${message}`;
    if (context === undefined || context === null) {
      console.log(finalMessage);
    } else {
      console.log(finalMessage, context);
    }
  }

  return {
    debug, info, notice, warn, error,
  };
}
