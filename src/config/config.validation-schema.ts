import * as Joi from 'joi'

export const validationSchema = Joi.object({
  PORT: Joi.number().port().default(3000),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('production'),
  LOGGER_FORMAT: Joi.string().valid('json', 'pretty').default('json'),
  LOGGER_LEVEL: Joi.number().valid(0, 1, 2, 3, 4, 5).default(3),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_SYNCHRONIZE: Joi.boolean().default(false),
  DB_MIGRATION_RUN: Joi.boolean().default(false),
})
