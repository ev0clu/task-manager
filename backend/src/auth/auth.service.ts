import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserService } from 'src/user/user.service';
import { OmitUser } from './interfaces/auth.interface';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

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

    return this.signToken(user.id, user.email);
  }

  async register(createUserDto: CreateUserDto): Promise<OmitUser> | never {
    const user = await this.userService.create(createUserDto);

    return user;
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = { sub: userId, email: email };

    const token = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });

    return {
      access_token: token,
      refresh_token: refreshToken,
    };
  }
}
