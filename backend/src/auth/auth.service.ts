import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { OmitUser } from './interfaces/auth.interface';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(authRegisterDto: AuthRegisterDto): Promise<OmitUser> | never {
    const existUserByEmail = await this.prisma.user.findUnique({
      where: {
        email: authRegisterDto.email,
      },
    });

    if (existUserByEmail) {
      throw new ConflictException('Conflict', {
        cause: new Error(),
        description: 'User already exist',
      });
    }

    const saltOrRounds = 10;
    const password = authRegisterDto.password;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user = await this.prisma.user.create({
      data: {
        username: authRegisterDto.username,
        email: authRegisterDto.email,
        password: hashedPassword,
      },
    });

    delete user.password;

    return user;
  }

  async login(
    authLoginDto: AuthLoginDto,
  ): Promise<{ access_token: string; refresh_token: string }> | never {
    const user = await this.prisma.user.findUnique({
      where: {
        email: authLoginDto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credentials incorrect');
    }

    const isPasswordMatch = await bcrypt.compare(
      authLoginDto.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Password incorrect');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenDB(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string) {
    /* await this.prisma.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
      },
    });*/

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        refreshToken: true,
      },
    });

    if (user['refreshToken'] == null)
      throw new ForbiddenException('Already logged out');

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: null,
      },
    });

    return true;
  }

  async refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<{ access_token: string; refresh_token: string }> | never {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.refreshToken || user.refreshToken == null) {
      throw new ForbiddenException('Access denied');
    }

    const isRefreshTokenMatch = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!isRefreshTokenMatch) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenDB(user.id, tokens.refresh_token);

    return tokens;
  }

  async getTokens(
    userId: string,
    email: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = { sub: userId, email: email };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>('JWT_SECRET'),
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>('REFRESH_JWT_SECRET'),
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshTokenDB(userId: string, refreshToken: string) {
    const saltOrRounds = 10;
    const hashedRefreshToken = await bcrypt.hash(refreshToken, saltOrRounds);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });
  }
}
