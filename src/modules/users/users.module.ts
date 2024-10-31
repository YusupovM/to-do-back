import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@src/modules/users/user.model';
import { UsersController } from '@src/modules/users/users.controller';
import { UsersService } from '@src/modules/users/users.service';
import { AuthGuardModule } from '@src/guards/auth.guard.module';
import { Task } from '@src/modules/tasks/task.model';

@Module({
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User, Task]),
    AuthGuardModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {
}
