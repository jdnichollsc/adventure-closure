import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { PROD_ENV } from './constants'

export function setupSwagger (app: INestApplication): void {
  const url = process.env.NODE_ENV === PROD_ENV ? 'https' : 'http'
  const options = new DocumentBuilder()
    .setTitle('Adventure Closure API')
    .setDescription('Manager users, authentication, etc')
    .setVersion('1.0')
    .addTag('Endpoints')
    .setContact('', '', 'jdnichollsc@mail.com')
    .addBearerAuth()
    .addServer(`${url}://`)
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
}