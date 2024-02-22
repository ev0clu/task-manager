import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma, Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(role?: Role): Promise<User[]> {
    let users: User[] = [];

    if (role) {
      users = await this.prisma.user.findMany({
        where: {
          role,
        },
      });
    }

    users = await this.prisma.user.findMany();

    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    return user;
  }

  async update(
    id: string,
    updateUserDto: Prisma.UserUpdateInput,
  ): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });

    return user;
  }

  async delete(id: string): Promise<User> {
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return user;
  }
}
