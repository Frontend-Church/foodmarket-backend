import { Injectable } from '@nestjs/common'
import { LoggerService as NestLoggerService } from '@nestjs/common'
import * as winston from 'winston'

import { ConfigService } from '../config/config.service'

import { buildLoggerInstance } from './logger.helper'

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: winston.Logger
  private context?: string

  constructor(private readonly configService: ConfigService) {
    const loggerFormat = this.configService.get('LOGGER_FORMAT')
    const loggerLevel = this.configService.get('LOGGER_LEVEL')
    this.logger = buildLoggerInstance(loggerLevel, loggerFormat)
  }

  public setContext(context: string): void {
    this.context = context
  }

  public trace(value: Message, context?: string): void {
    this.logMessage('trace', value, context)
  }

  public debug(value: Message, context?: string): void {
    this.logMessage('debug', value, context)
  }

  public info(value: Message, context?: string): void {
    this.logMessage('info', value, context)
  }

  public warn(value: Message, context?: string): void {
    this.logMessage('warn', value, context)
  }

  public error(value: Message, context?: string): void {
    this.logMessage('error', value, context)
  }

  public fatal(value: Message, context?: string): void {
    this.logMessage('fatal', value, context)
  }

  public log(value: Message, context?: string): void {
    this.info(value, context)
  }

  private logMessage(level: Level, value: Message, context?: string): void {
    if (typeof value === 'string') {
      this.logger.log(level, value, { context: context || this.context })
    } else {
      const { message, ...meta } = value
      this.logger.log(level, message || 'UNDEFINED_MESSAGE', {
        context: context || this.context,
        ...meta,
      })
    }
  }
}

type Message = string | (Record<string, unknown> & { message?: string; error?: unknown })
type Level = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'
