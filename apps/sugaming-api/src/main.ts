import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

export default async function bootstrap() {
  // API setup
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const port = process.env.PORT || 3000;
  app.setGlobalPrefix(globalPrefix);

  // OpenAPI setup
  const config = new DocumentBuilder()
    .setTitle('sugaming-api')
    .setDescription(
      'SUGAMING API for the Sofia University gaming club tournament and event platform.',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  // Start the API
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
