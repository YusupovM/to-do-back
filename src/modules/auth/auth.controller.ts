import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '@src/modules/auth/auth.service';
import { LoginDto, TokenDto } from '@src/modules/auth/dto/login.dto';
import { AuthGuard } from '@src/guards/auth.guard';
import { OkResponse } from '@src/utils/api-responses';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'login' })
  @ApiOkResponse({ type: TokenDto })
  login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'logout' })
  @ApiOkResponse({ type: OkResponse })
  logout(@Req() req): Promise<OkResponse> {
    return this.authService.logout();
  }
}
