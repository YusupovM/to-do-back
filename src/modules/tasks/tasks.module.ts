import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksController } from '@src/modules/tasks/tasks.controller';
import { TasksService } from '@src/modules/tasks/tasks.service';
import { Task } from '@src/modules/tasks/task.model';
import { AuthGuardModule } from '@src/guards/auth.guard.module';
import { User } from '@src/modules/users/user.model';

@Module({
  controllers: [
    TasksController,
  ],
  imports: [
    SequelizeModule.forFeature([Task, User]),
    AuthGuardModule,
  ],
  providers: [TasksService],
})
export class TasksModule {
}
