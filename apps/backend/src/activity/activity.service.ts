import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TActivity } from './types/activity.type';
import { CreateActivityDto } from './dto/create-activity.dto';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  async findAll(workspaceId: string): Promise<TActivity[]> | never {
    const activity = await this.prisma.activity.findMany({
      where: {
        workspaceId,
      },
    });

    if (!activity) {
      throw new NotFoundException('Activity has not found');
    }

    return activity;
  }

  async create(
    workspaceId: string,
    createActivityDto: CreateActivityDto,
  ): Promise<TActivity> {
    const workspace = await this.prisma.workspace.findUnique({
      where: {
        id: workspaceId,
      },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    const activity = await this.prisma.activity.create({
      data: {
        title: createActivityDto.title,
        workspace: { connect: { id: workspaceId } },
      },
    });

    return activity;
  }
}
