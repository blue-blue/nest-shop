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
    console.log('getUser: ', this.configService.get('DB_HOST'));
    this.logger.log('logger is working');
    return this.userService.getUserBaseInfo();
  }
}
