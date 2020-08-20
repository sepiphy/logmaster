const { LogMaster } = require('./dist');

const log = LogMaster({
    name: 'LogMaster', // default to "console".
});

log.debug('This is a debug message.');
log.info('This is an info message.');
log.notice('This is a notice message.');
log.warn('This is a warn message.');
log.error('This is an error message.');
