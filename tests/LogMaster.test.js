const { LogMaster } = require('../dist');
const assert = require('assert');

describe('LogMaster', function () {
  describe('#log()', function () {
    it('suold call the log callback and pass formated message.', function () {
      const log = LogMaster({
        name: 'Test',
      });
      log.logUsing(function (message, context) {
        assert.equal(true, message.indexOf('Running test') !== -1);
      });
      log.info('Running test');
    });
    it('suold call the log callback and pass formated message and context.', function () {
      const log = LogMaster({
        name: 'Test',
      });
      log.logUsing(function (message, context) {
        assert.equal(true, message.indexOf('Running test') !== -1);
        assert.equal('LogMaster', context.name);
      });
      log.info('Running test', { name: 'LogMaster' });
    });
  });
});
