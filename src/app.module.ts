import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import ConfigModule from './config/config.module';
import { envOrFail } from './config/config.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: envOrFail('DB_HOST') || 'localhost',
    port: envOrFail('DB_PORT') || 3306,
    username: envOrFail('DB_USERNAME'),
    password: envOrFail('DB_PASSWORD'),
    database: 'employees',
    entities: [User],
    synchronize: true
  }), UsersModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
