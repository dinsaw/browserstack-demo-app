const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, simple } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    format.printf((m) => {
      return `${m.timestamp} ${m.level} ${m.message} service=${m.service}`;
    })
  ),
  defaultMeta: { service: 'browserstack-demo-app' },
  transports: [
    new transports.File({ filename: 'combined.log' }),
  ],
});

exports.logger = logger;