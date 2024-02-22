import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma, Role } from '@prisma/client';
import { OmitUser } from './interfaces/user.interface';

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

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    delete user.password;

    return user;
  }

  async create(createUserDto: Prisma.UserCreateInput): Promise<OmitUser> {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    delete user.password;

    return user;
  }

  async update(
    id: string,
    updateUserDto: Prisma.UserUpdateInput,
  ): Promise<OmitUser> {
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
