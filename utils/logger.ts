import { write } from "fs";
import { createLogger, format, transports } from "winston";
import { addColors } from "winston/lib/winston/config";

const { combine, timestamp, printf, colorize, errors } = format;

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3, // Add 'http' level
    debug: 4,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta", // Color for 'http' level
    debug: "blue",
  },
};

addColors(customLevels.colors);

const customFormat = combine(
  colorize({ all: true }),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  errors({ stack: true }),
  printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
  })
);

const logger = createLogger({
  levels: customLevels.levels,
  level: "info",
  format: customFormat,
  transports: [new transports.Console()],
});

export const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

export default logger;
