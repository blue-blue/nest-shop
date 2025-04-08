import { utilities } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export const createConsoleTransport = (level: string = 'info') => {
  return new winston.transports.Console({
    level,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      utilities.format.nestLike(),
    ),
  });
};
export function createDailyRotateTransport(level: string, fileName: string) {
  return new DailyRotateFile({
    level,
    dirname: 'logs',
    filename: `${fileName}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
  });
}
