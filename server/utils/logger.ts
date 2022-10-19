import winston, { format } from "winston";
import path from "path";

import { LOGFILES_DIR, PRODUCTION } from "../config/constants";

const MB_IN_BYTES = 1_000_000;

const commonFormats = [
  format.timestamp(),
  format.errors({ stack: true }),
];

const uncaughtTransport = new winston.transports.File({
  tailable: true,
  maxFiles: 1,
  maxsize: 5 * MB_IN_BYTES,
  format: format.combine(
    ...commonFormats,
    format.simple()
  ),
  filename: path.resolve(LOGFILES_DIR, "uncaught.log")
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "warn",
      maxsize: 10 * MB_IN_BYTES,
      maxFiles: 5,
      tailable: true,
      format: format.combine(
        ...commonFormats,
        format.json()
      ),
      filename: path.resolve(LOGFILES_DIR, "errors.log")
    }),
  ],
  exceptionHandlers: [ uncaughtTransport ],
  rejectionHandlers: [ uncaughtTransport ]
});

if(!PRODUCTION) {
  logger.add(new winston.transports.Console());
}

export default logger;
