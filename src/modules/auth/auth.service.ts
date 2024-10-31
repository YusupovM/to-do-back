import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '@src/modules/users/users.service';
import { User } from '@src/modules/users/user.model';
import { LoginDto, TokenDto } from '@src/modules/auth/dto/login.dto';
import { OkResponse } from '@src/utils/api-responses';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {
  }

  public async login(loginDto: LoginDto): Promise<TokenDto> {
    const user: User = await this.usersService.getUserByProps({ username: loginDto.username }, ['password']);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword: boolean = await bcrypt.compare(loginDto.password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException('Username or password is incorrect');
    }

    return this.generateToken(user);
  }

  public async logout(): Promise<OkResponse> {
    return {
      message: 'logout',
    };
  }

  private generateToken(user: User): TokenDto {
    const payload = { id: user.id, username: user.username };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
