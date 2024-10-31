import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Удаляет свойства, не указанные в DTO
      forbidNonWhitelisted: true, // Генерирует ошибку, если присутствуют неразрешенные свойства
      transform: true, // Преобразует входящие данные в DTO
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('ToDo document Api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  const PORT = process.env.PORT || 5000;
  console.log(`Server started on port: ${PORT}`);
  await app.listen(PORT);
}

bootstrap();
