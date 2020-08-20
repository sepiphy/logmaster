const { LogMaster } = require('../dist');
const assert = require('assert');

describe('LogMaster', function () {
  describe('#log()', function () {
    it('should call the log callback and pass formated message.', function () {
      const log = LogMaster({ name: 'Test' });
      log.logUsing(function (message, context) {
        assert.equal(message.indexOf('Running test') !== -1, true);
      });
      log.info('Running test');
    });
    it('should call the log callback and pass formated message and context.', function () {
      const log = LogMaster({ name: 'Test' });
      log.logUsing(function (message, context) {
        assert.equal(message.indexOf('Running test') !== -1, true);
        assert.equal(context.name, 'LogMaster');
      });
      log.info('Running test', { name: 'LogMaster' });
    });
  });

  describe('#disableUsing()', function () {
    it('should set disable condition.', function () {
      const log = LogMaster({ name: 'Test' });
      let count = 0;
      log.logUsing(function (message, context) {
        count = count + 1;
      });
      log.disableUsing(function () {
        return true;
      });
      log.info('Running test');
      assert.equal(count, 0);
      log.disableUsing(function () {
        return false;
      });
      log.info('Running test');
      assert.equal(count, 1);
    });
  });
});
