import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'

import { ConfigService } from '../config/config.service'
import { validationSchema } from '../config/config.validation-schema'
import { buildLoggerInstance } from '../logger/logger.helper'

import { buildTypeormConfig } from './typeorm.options'

dotenv.config({
  override: false,
  debug: ConfigService.isDevelopment,
  path: ['.env.local', '.env'],
})

function buildTypeormMigrationConfig(): DataSource {
  const { error, value, warning } = validationSchema.validate(process.env, {
    stripUnknown: true,
  })
  const logger = buildLoggerInstance(value.LOGGER_LEVEL, value.LOGGER_FORMAT)
  if (error) {
    logger.error({ message: 'Config validation error', error })
    throw new Error(`Config validation error: ${error}`)
  }
  if (warning)
    logger.warn({
      message: 'Config validation warning',
      warning,
    })
  return new DataSource(
    buildTypeormConfig({
      host: value.DB_HOST,
      port: Number(value.DB_PORT),
      user: value.DB_USER,
      password: value.DB_PASSWORD,
      database: value.DB_NAME,
      synchronize: value.DB_SYNCHRONIZE,
      migrationsRun: value.DB_MIGRATION_RUN,
    }),
  )
}

export default buildTypeormMigrationConfig()
