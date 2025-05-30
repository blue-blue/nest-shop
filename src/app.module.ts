import { Global, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from './common/config/config.module';
import { LogsModule } from './common/logger/logs.module';
import { UserModule } from './user/user.module';
import { CustomRedisModule } from './common/redis/redis.module';

@Global()
@Module({
  imports: [ConfigModule, LogsModule, UserModule, CustomRedisModule],
  controllers: [AppController],
  providers: [AppService, Logger],
  exports: [Logger],
})
export class AppModule {}
