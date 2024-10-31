import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { User } from '@src/modules/users/user.model';
import { UsersService } from '@src/modules/users/users.service';
import { AuthGuard } from '@src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: [User] })
  getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
