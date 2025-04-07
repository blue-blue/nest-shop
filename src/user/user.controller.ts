/*
 * @Author: richu 946245813@qq.com
 * @Date: 2025-04-03 20:51:24
 * @LastEditors: richu 946245813@qq.com
 * @LastEditTime: 2025-04-07 19:43:16
 * @FilePath: \nest-shop\src\user\user.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Controller, Get, Inject, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';

interface User {
  code: number;
  message: string;
  data: {
    name: string;
  };
}

@Controller('user')
export class UserController {
  // private logger = new Logger(UserController.name);
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private readonly logger: Logger,
  ) {}
  @Get()
  getUser(): User {
    this.logger.log('getUser success');
    console.log('getUser: ', this.configService.get('DB_HOST'));
    this.logger.log('logger is working');
    return this.userService.getUserBaseInfo();
  }
}
