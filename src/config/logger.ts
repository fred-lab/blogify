import { format, transports, loggers } from "winston";

/**
 * A logger to log access error in a file
 */
const access = loggers.add("access", {
  level: "info",
  handleExceptions: true,
  exitOnError: false,
  transports: [
    new transports.File({
      filename: `var/logs/access.log`,
      format: format.json(),
    }),
  ],
});
/**
 * A logger to log system  error in a file
 */
const errors = loggers.add("errors", {
  level: "info",
  handleExceptions: true,
  exitOnError: false,
  transports: [
    new transports.File({
      filename: `var/logs/errors.log`,
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

export { access, errors };
