import { Module } from '@nestjs/common';
import { ConfigModule as ConfigM } from '@nestjs/config';
import * as Joi from 'joi';

const envFilePath = [`.env.${process.env.NODE_ENV || 'development'}`, `.env`];
const schema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),
  PORT: Joi.number().default(3999),
  DB_HOST: Joi.string().ip(),
});

@Module({
  imports: [
    ConfigM.forRoot({
      isGlobal: true,
      envFilePath,
      validationSchema: schema,
    }),
  ],
})
export class ConfigModule {}
