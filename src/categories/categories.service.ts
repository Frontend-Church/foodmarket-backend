import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from './entities/category.entity'

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) public readonly categoriesRepository: Repository<Category>) {}

  async create(createCategoryDto: CreateCategoryDto) {
    this.categoriesRepository.create(createCategoryDto)
  }

  async findAll() {
    return await this.categoriesRepository.find()
  }

  async findOne(id: string) {
    return await this.categoriesRepository.findOne({ where: { id } })
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoriesRepository.update(id, updateCategoryDto)
  }

  async remove(id: string) {
    const entity = await this.categoriesRepository.findOne({ where: { id } })
    return this.categoriesRepository.remove(entity)
  }
}
