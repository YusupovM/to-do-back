import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from '@src/modules/tasks/dto/create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
}
