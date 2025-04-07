import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { createLogger } from 'winston';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
async function bootstrap() {
  const instance = createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike(),
        ),
      }),
    ],
  });
  const app = await NestFactory.create(AppModule, {
    // 关闭整个nestjs的日志输出，包括访问日志，错误日志等
    // logger: false,
    // logger: ['error', 'warn'],
    logger: WinstonModule.createLogger({
      instance,
    }),
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3999);
  await app.listen(port);
}
bootstrap();
