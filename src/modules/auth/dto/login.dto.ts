import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String, required: true, example: 'testuser' })
  @IsString()
  username: string;

  @ApiProperty({ type: String, required: true, example: 'testpass' })
  @IsString()
  password: string;
}

export class TokenDto {
  @ApiProperty({ type: String })
  token: string;
}
