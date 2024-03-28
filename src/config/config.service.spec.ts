import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService as NestConfigService } from '@nestjs/config'

import { ConfigService } from './config.service'

describe('ConfigService', () => {
  let configService: ConfigService
  let nestConfigService: NestConfigService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: NestConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: 'PORT' | 'NODE_ENV') => {
              switch (key) {
                case 'PORT':
                  return '3000'
                case 'NODE_ENV':
                  return 'test'
                default:
                  return null
              }
            }),
          },
        },
      ],
    }).compile()

    configService = app.get(ConfigService)
    nestConfigService = app.get(NestConfigService)
  })

  describe('isTest', () => {
    it('should return true if NODE_ENV is test', () => {
      process.env.NODE_ENV = 'test'
      expect(ConfigService.isTest).toBe(true)
    })

    it('should return false if NODE_ENV is not test', () => {
      process.env.NODE_ENV = 'production'
      expect(ConfigService.isTest).toBe(false)
    })
  })

  describe('get', () => {
    it('should return the correct value for the key', () => {
      const key = 'PORT'
      const value = configService.get(key)
      expect(value).toBe('3000')
      expect(nestConfigService.get).toHaveBeenCalledWith(key, { infer: true })
    })
  })
})
