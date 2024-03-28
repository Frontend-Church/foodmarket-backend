import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService<Configuration, true>) {}

  public static get isTest(): boolean {
    return process.env.NODE_ENV === 'test'
  }

  public static get isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development'
  }

  public get<K extends keyof Configuration>(key: K): Configuration[K] {
    return this.configService.get(key, { infer: true })
  }
}

export type Configuration = {
  PORT: number
  NODE_ENV: 'production' | 'development' | 'test'
  LOGGER_FORMAT: 'json' | 'pretty'
  LOGGER_LEVEL: 0 | 1 | 2 | 3 | 4 | 5
  DB_HOST: string
  DB_PORT: number
  DB_NAME: string
  DB_USER: string
  DB_PASSWORD: string
  DB_SYNCHRONIZE: boolean
  DB_MIGRATION_RUN: boolean
}
