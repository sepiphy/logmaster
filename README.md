### Usage

Configure a LogMaster instance.

```javascript
const { LogMaster } = require('logmaster');
// import { LogMaster } from 'logmaster';

const log = LogMaster({
    name: 'YourAppName',
});
```

Use log in your code.

```javascript
log.debug('This is a debug message.');
log.info('This is an info message.');
log.notice('This is a notice message.');
log.warn('This is a warn message.');
log.error('This is an error message.');
```

Disable on "production" mode.

```javascript
log.disableUsing(() => {
    return process.env.NODE_ENV === 'production';
});
```
