import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class OkResponse {
  @ApiProperty({ type: String })
  message: string;
}

export class NotFoundResponse {
  @ApiProperty({ type: String })
  message: string;
  @ApiProperty({ type: String })
  error: string;
  @ApiProperty({ type: Number, example: HttpStatus.NOT_FOUND })
  statusCode: HttpStatus.NOT_FOUND;
}

export class BadRequestResponse {
  @ApiProperty({ type: [String] })
  message: string;
  @ApiProperty({ type: String })
  error: string;
  @ApiProperty({ type: Number, example: HttpStatus.BAD_REQUEST })
  statusCode: HttpStatus.BAD_REQUEST;
}
