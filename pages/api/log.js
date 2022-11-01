const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { app: 'browserstack-demo-app' },
  transports: [
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

exports.logger = logger;