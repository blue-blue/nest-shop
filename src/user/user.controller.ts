import Redis from 'ioredis';
import { Controller, Get, Logger } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { InjectRedis } from '@nestjs-modules/ioredis';

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
    // private configService: ConfigService,
    @InjectRedis() private readonly redis: Redis,
    private userService: UserService,
    private readonly logger: Logger,
  ) {}
  @Get()
  getUser(): User {
    try {
      this.logger.warn('logger is working');
      return this.userService.getUserBaseInfo();
    } catch (error) {
      this.logger.error('get user error', error);
    }
    // this.logger.log('getUser success');
    // console.log('getUser: ', this.configService.get('DB_HOST'));
    // this.logger.log('logger is working');
  }
  @Get('redis')
  async getRedis() {
    try {
      // 设置 Redis 数据
      // await this.redis.set('token', 'Redis data!');
      const redisData = await this.redis.get('token');
      return { code: 200, message: 'Success', data: { redisData } }; // 返回成功响应
    } catch (error) {
      this.logger.error('Redis operation failed', error);
      return { code: 500, message: 'Redis Operation Failed', data: null }; // 返回错误响应
    }
  }
}
