import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CategoriesModule } from './categories/categories.module'
import { ProductsModule } from './products/products.module'
import { TypeormModule } from './typeorm/typeorm.module'
import { LoggerModule } from './logger/logger.module'
import { ConfigModule } from './config/config.module'

@Module({
  imports: [ConfigModule, LoggerModule, TypeormModule, CategoriesModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
