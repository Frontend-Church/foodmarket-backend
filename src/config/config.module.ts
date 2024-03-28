import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'

import { ConfigService } from './config.service'
import { validationSchema } from './config.validation-schema'

const testEnvFilePaths = ['.env.local.test', '.env.test', '.env']
const prodEnvFilePaths = ['.env.local', '.env']
const envFilePath = ConfigService.isTest ? testEnvFilePaths : prodEnvFilePaths

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath,
      cache: true,
      validationOptions: {
        allowUnknown: false,
        stripUnknown: true,
        abortEarly: true,
        convert: true,
      },
      validationSchema,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
