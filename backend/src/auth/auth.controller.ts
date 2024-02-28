import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { OmitUser } from './interfaces/auth.interface';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(
    @Body() authRegisterDto: AuthRegisterDto,
  ): Promise<OmitUser> | never {
    return this.authService.register(authRegisterDto);
  }

  @Post('login')
  login(
    @Body() authLoginDto: AuthLoginDto,
  ): Promise<{ access_token: string; refresh_token: string }> | never {
    return this.authService.login(authLoginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    const user = req.user;
    return this.authService.logout(user['sub']);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @Req() req: Request,
  ): Promise<{ access_token: string; refresh_token: string }> | never {
    const user = req.user;

    return this.authService.refreshTokens(user['sub'], user['refreshToken']);
  }
}
