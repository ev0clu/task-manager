import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TList } from './types/list.type';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async findAll(boardId: string): Promise<TList[]> | never {
    const list = await this.prisma.list.findMany({
      where: {
        boardId,
      },
      include: {
        cards: true,
      },
    });

    if (!list) {
      throw new NotFoundException('List has not found');
    }

    return list;
  }

  async findOne(id: string): Promise<TList> | never {
    const list = await this.prisma.list.findUnique({
      where: {
        id,
      },
    });

    if (!list) {
      throw new NotFoundException('List has not found');
    }

    return list;
  }

  async create(boardId: string, createListDto: CreateListDto): Promise<TList> {
    const board = await this.prisma.board.findUnique({
      where: {
        id: boardId,
      },
    });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    const list = await this.prisma.list.create({
      data: {
        title: createListDto.title,
        board: { connect: { id: boardId } },
      },
    });

    return list;
  }

  async update(id: string, updateListDto: UpdateListDto): Promise<TList> {
    const list = await this.prisma.list.update({
      where: {
        id,
      },
      data: {
        title: updateListDto.title,
      },
    });

    return list;
  }

  async delete(id: string): Promise<{ message: string; statusCode: string }> {
    try {
      const list: TList = await this.prisma.list.delete({
        where: { id },
      });

      return {
        message: `${list.title} has been deleted`,
        statusCode: '200',
      };
    } catch (error) {
      return {
        message: error,
        statusCode: '404',
      };
    }
  }
}
