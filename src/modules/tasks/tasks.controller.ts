import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from '@src/modules/tasks/tasks.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestResponse, NotFoundResponse, OkResponse } from '@src/utils/api-responses';
import { Task } from '@src/modules/tasks/task.model';
import { CreateTaskDto, FilterTask } from '@src/modules/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '@src/modules/tasks/dto/update-task.dto';
import { AuthGuard } from '@src/guards/auth.guard';
import { User } from '@src/modules/users/user.model';

@ApiTags('Tasks')
@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {
  }

  @Get()
  @ApiOperation({ summary: 'Get tasks' })
  @ApiOkResponse({ type: [Task] })
  getAll(@Query() filter: FilterTask) {
    return this.taskService.getAllTasks(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by id' })
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ type: NotFoundResponse })
  getById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create task' })
  @ApiCreatedResponse({ type: Task })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @UsePipes(new ValidationPipe())
  create(@Body() createTaskDto: CreateTaskDto, @Req() req): Promise<Task> {
    const user: User = req.user;
    return this.taskService.createTask(user.id, createTaskDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update task' })
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ type: NotFoundResponse })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task' })
  @ApiOkResponse({ type: OkResponse })
  @ApiNotFoundResponse({ type: NotFoundResponse })
  delete(@Param('id') id: number): Promise<OkResponse> {
    return this.taskService.removeTask(id);
  }
}
