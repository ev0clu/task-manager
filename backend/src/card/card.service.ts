import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TCard } from './types/card.type';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}

  async findAll(listId: string): Promise<TCard[]> | never {
    const card = await this.prisma.card.findMany({
      where: {
        listId,
      },
    });

    if (!card) {
      throw new NotFoundException('Card has not found');
    }

    return card;
  }

  async findOne(id: string): Promise<TCard> | never {
    const card = await this.prisma.card.findUnique({
      where: {
        id,
      },
    });

    if (!card) {
      throw new NotFoundException('Card has not found');
    }

    return card;
  }

  async create(listId: string, createCardDto: CreateCardDto): Promise<TCard> {
    const list = await this.prisma.list.findUnique({
      where: {
        id: listId,
      },
    });

    if (!list) {
      throw new NotFoundException('List not found');
    }

    const card = await this.prisma.card.create({
      data: {
        title: createCardDto.title,
        description: createCardDto.description,
        priority: createCardDto.priority,
        list: { connect: { id: listId } },
      },
    });

    return card;
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<TCard> {
    const card = await this.prisma.card.update({
      where: {
        id,
      },
      data: {
        title: updateCardDto.title,
        description: updateCardDto.description,
        priority: updateCardDto.priority,
      },
    });

    return card;
  }

  async delete(id: string): Promise<{ message: string; statusCode: string }> {
    try {
      const card: TCard = await this.prisma.card.delete({
        where: { id },
      });

      return {
        message: `${card.title} has been deleted`,
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
