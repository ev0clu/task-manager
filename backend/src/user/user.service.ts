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
    const existUserByEmail = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (existUserByEmail) {
      throw new ConflictException('Conflict', {
        cause: new Error(),
        description: 'User already exist',
      });
    }

    const saltOrRounds = 10;
    const password = createUserDto.password;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword,
      },
    });

    delete user.password;

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<OmitUser> {
    const saltOrRounds = 10;
    const password = updateUserDto.password;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        username: updateUserDto.username,
        email: updateUserDto.email,
        password: hashedPassword,
      },
    });

    delete user.password;

    return user;
  }

  async delete(id: string): Promise<string> {
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return `User #id: ${user.id} has been deleted successfully`;
  }
}
