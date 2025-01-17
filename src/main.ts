import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { env } from './config/config.service';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['ksajdvcj']
  }));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  
  Logger.debug(`'User Management' App is running in '${env('NODE_ENV')}' mode`);

  await app.listen(env('PORT') ?? 3000, env('HOST'));
}
bootstrap();
