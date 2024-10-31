import { Column, Model, Table, ForeignKey, DataType, BelongsTo, DefaultScope } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@src/modules/users/user.model';
import { Status } from '@src/modules/tasks/dto/create-task.dto';

@DefaultScope(() => ({
  include: [User],
}))
@Table({ tableName: 'tasks' })
export class Task extends Model<Task> {
  @ApiProperty({ type: Number })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ type: String, required: true, example: 'Task title' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ type: String, example: 'Task description' })
  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @ApiProperty({ enum: Status, example: Status.INCOMPLETE })
  @Column({ type: DataType.ENUM(Status.COMPLETED, Status.INCOMPLETE), defaultValue: Status.INCOMPLETE })
  status: Status;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
