import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 关闭整个nestjs的日志输出，包括访问日志，错误日志等
    // logger: false,
    logger: ['error', 'warn'],
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3999);
  await app.listen(port);
}
bootstrap();
