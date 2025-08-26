import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http_exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Áp dụng ValidationPipe toàn cục để validate DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Chỉ chấp nhận các thuộc tính đã định nghĩa trong DTO
      forbidNonWhiteListed: true, // Ném lỗi nếu có thuộc tính không được định nghĩa
      transform: true, // Tự động chuyển đổi kiểu dữ liệu
    }),
  );

  // Áp dụng HttpExceptionFilter toàn cục để định dạng lỗi
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
