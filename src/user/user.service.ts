import { Injectable } from '@nestjs/common';
interface User {
  code: number;
  message: string;
  data: {
    name: string;
  };
}

@Injectable()
export class UserService {
  getUserBaseInfo(): User {
    return {
      code: 200,
      message: 'success',
      data: {
        name: '潇洒哥',
      },
    };
  }
}
