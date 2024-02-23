import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import { OmitUser } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(
    authLoginDto: AuthLoginDto,
  ): Promise<{ access_token: string }> | never {
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

  async register(authRegisterDto: AuthRegisterDto): Promise<OmitUser> | never {
    const user = await this.userService.create(authRegisterDto);

    return user;
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email: email };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
