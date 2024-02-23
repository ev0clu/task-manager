import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Role } from '@prisma/client';
import { OmitUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(role?: Role): Promise<OmitUser[]> {
    let users: User[] = [];

    if (role) {
      users = await this.prisma.user.findMany({
        where: {
          role,
        },
      });
    }

    users = await this.prisma.user.findMany();

    const omitUsers: OmitUser[] = users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    });

    return omitUsers;
  }

  async findOne(id: string): Promise<OmitUser> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    delete user.password;

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<OmitUser> {
    const isUserExist = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (isUserExist) {
      throw new ConflictException('Conflict', {
        cause: new Error(),
        description: 'User already exist',
      });
    }

    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    delete user.password;

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<OmitUser> {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });

    return user;
  }

  async delete(id: string): Promise<OmitUser> {
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return user;
  }
}
