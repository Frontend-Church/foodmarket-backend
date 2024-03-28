import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'

import { LoggerService } from './logger/logger.service'

import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true })
  app.useLogger(app.get(LoggerService))
  app.enableCors({
    origin: 'https://studio.apollographql.com',
    methods: 'OPTIONS,POST',
  })
  app.disable('x-powered-by')
  const port = app.get(ConfigService).get('PORT')
  await app.listen(port)
}

bootstrap()
