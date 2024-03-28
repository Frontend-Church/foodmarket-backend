import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'

import { buildTypeormConfig } from './typeorm.options'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return buildTypeormConfig({
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          user: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          synchronize: configService.get('DB_SYNCHRONIZE'),
          migrationsRun: configService.get('DB_MIGRATION_RUN'),
        })
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
})
export class TypeormModule {}
