import * as winston from 'winston'

import { jsonConsole, prettyConsole } from './logger.transports'
import { Configuration } from 'src/config/config.service'

export function buildLoggerInstance(
  loggerLevel: Configuration['LOGGER_LEVEL'],
  loggerFormat: Configuration['LOGGER_FORMAT'],
): winston.Logger {
  const levels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace']
  return winston.createLogger({
    levels: {
      fatal: 0,
      error: 1,
      warn: 2,
      info: 3,
      debug: 4,
      trace: 5,
    },
    level: levels[loggerLevel],
    transports: [loggerFormat === 'json' ? jsonConsole : prettyConsole],
  })
}
