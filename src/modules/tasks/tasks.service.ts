import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OkResponse } from '@src/utils/api-responses';
import { Task } from '@src/modules/tasks/task.model';
import { UpdateTaskDto } from '@src/modules/tasks/dto/update-task.dto';
import { User } from '@src/modules/users/user.model';
import { FilterTask } from '@src/modules/tasks/dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskModel: typeof Task) {
  }

  public async getAllTasks(filter: FilterTask) {
    console.log(filter);
    const skip: number = filter.limit * (filter.page - 1);
    const filterTask: any = {};

    if (filter.status) {
      filterTask.status = filter.status;
    }

    const { rows: tasks, count: total } = await this.taskModel.findAndCountAll({
      where: filterTask,
      limit: filter.limit,
      offset: skip,
    });

    return {
      page: filter.page,
      limit: filter.limit,
      total,
      data: tasks,
    };
  }

  public async getTaskById(id: number): Promise<Task> {
    const task: Task = await this.taskModel.findByPk(id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  public async createTask(userId: number, createTaskDto): Promise<Task> {
    const task: Task = await this.taskModel.create({ userId, ...createTaskDto }, { include: [User] });
    return task.reload();
  }

  public async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task: Task = await this.taskModel.findByPk(id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    Object.assign(task, updateTaskDto);

    return task.save();
  }

  public async removeTask(id: number): Promise<OkResponse> {
    const taskDeleteCount: number = await this.taskModel.destroy({
      where: { id },
    });

    if (!taskDeleteCount) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return {
      message: 'Task deleted',
    };
  }
}
