/*
 * @Author: richu 946245813@qq.com
 * @Date: 2025-04-03 20:51:24
 * @LastEditors: richu 946245813@qq.com
 * @LastEditTime: 2025-04-07 19:42:47
 * @FilePath: \nest-shop\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
