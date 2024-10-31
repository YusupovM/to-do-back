import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from '@src/app.controller';
import { AuthModule } from '@src/modules/auth/auth.module';
import { TasksModule } from '@src/modules/tasks/tasks.module';
import { UsersModule } from '@src/modules/users/users.module';
import { Task } from '@src/modules/tasks/task.model';
import { User } from '@src/modules/users/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      synchronize: true,
      models: [Task, User],
    }),
    TasksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {
}
