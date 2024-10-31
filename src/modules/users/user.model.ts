import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, DefaultScope, HasMany, Model, Table } from 'sequelize-typescript';
import { Task } from '@src/modules/tasks/task.model';

@Table({ tableName: 'users' })
@DefaultScope(() => ({
  attributes: { exclude: ['password'] },
}))
export class User extends Model<User> {
  @ApiProperty({ type: Number })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ type: String, example: 'testuser' })
  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasMany(() => Task)
  tasks: Task[];
}
