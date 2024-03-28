import { DataSourceOptions } from 'typeorm'
import * as path from 'path'

type DataSourceConfig = {
  host: string
  port: number
  user: string
  password: string
  database: string
  synchronize: boolean
  migrationsRun: boolean
}

export function buildTypeormConfig(config: DataSourceConfig): DataSourceOptions {
  const sourcePath = path.join(__dirname, '../')
  const entitiesPath = path.join(sourcePath, '**/*.entity.{js,ts}')
  const migrationsPath = path.join(sourcePath, 'typeorm/migrations/*.{js,ts}')
  return {
    entities: [entitiesPath],
    migrations: [migrationsPath],
    subscribers: [],
    type: 'postgres',
    host: config.host,
    port: config.port,
    username: config.user,
    password: config.password,
    database: config.database,
    synchronize: config.synchronize,
    migrationsRun: config.migrationsRun,
    migrationsTableName: 'migrations',
    logging: ['error', 'warn'],
  }
}
