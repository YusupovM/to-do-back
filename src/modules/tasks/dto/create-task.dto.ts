import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export enum Status {
  COMPLETED = 'completed',
  INCOMPLETE = 'incomplete',
}

export class CreateTaskDto {
  @ApiProperty({ type: String, required: true, example: 'Task title' })
  @IsString()
  title: string;

  @ApiProperty({ type: String, example: 'Task description' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ enum: Status, example: Status.INCOMPLETE })
  @IsEnum(Status)
  @IsOptional()
  status: Status;
}

export class FilterTask {
  @ApiProperty({ enum: Status, example: Status.INCOMPLETE, required: false })
  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @ApiProperty({ type: Number, example: 1, default: 1, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page: number = 1;

  @ApiProperty({ type: Number, example: 20, default: 20, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit: number = 20;
}
