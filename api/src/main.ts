import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { json, urlencoded } from 'body-parser'
import { join } from 'path'

import { AppModule } from './app.module'
import { createLogger } from './logger'
import { setupSwagger } from './swagger'
import { setupSecurity } from './security'
import { PROD_ENV, PORT } from './constants'

async function bootstrap () {
  const app = await NestFactory.create < NestExpressApplication > (AppModule, {
    logger: process.env.NODE_ENV === PROD_ENV ? createLogger() : ['error', 'warn', 'debug']
  })

  // BASIC CONFIGURATION
  app.useStaticAssets(join(__dirname, 'public'))
  app.setBaseViewsDir(join(__dirname, 'views'))
  app.setViewEngine('ejs')

  // PARSE REQUESTS
  app.use(urlencoded({ extended: true }))
  app.use(json({
    limit: '10mb'
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  // SECURITY
  setupSecurity(app)

  // OPEN API
  setupSwagger(app)

  // Register the proxy’s IP address (load balancer or reverse proxy)
  // app.set('trust proxy', function (ip: string) {
  //   if (ip === '127.0.0.1') return true // trusted IPs
  //   else return false
  // })
  await app.listen(PORT)
}
bootstrap()
