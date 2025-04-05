import { Controller, Get, Logger } from '@nestjs/common';
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
  private logger = new Logger(UserController.name);
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {}
  @Get()
  getUser(): User {
    this.logger.log('getUser success');
    console.log('getUser: ', this.configService.get('DB_HOST'));
    return this.userService.getUserBaseInfo();
  }
}
