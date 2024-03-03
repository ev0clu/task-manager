import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceDto } from './dto/workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

@Injectable()
export class WorkspaceService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string): Promise<WorkspaceDto[]> | never {
    const workspace = await this.prisma.workspace.findMany({
      where: {
        userId,
      },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace has not found');
    }

    return workspace;
  }

  async findOne(id: string): Promise<WorkspaceDto> | never {
    const workspace = await this.prisma.workspace.findUnique({
      where: {
        id,
      },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace has not found');
    }

    return workspace;
  }

  async create(
    createWorkspaceDto: CreateWorkspaceDto,
    userId: string,
  ): Promise<WorkspaceDto> {
    const workspace = await this.prisma.workspace.create({
      data: {
        title: createWorkspaceDto.title,
        userId,
      },
    });

    return workspace;
  }

  async update(
    id: string,
    updateWorkspaceDto: UpdateWorkspaceDto,
  ): Promise<WorkspaceDto> {
    const workspace = await this.prisma.workspace.update({
      where: {
        id,
      },
      data: {
        title: updateWorkspaceDto.title,
      },
    });

    return workspace;
  }

  async delete(id: string): Promise<{ message: string; statusCode: string }> {
    const workspace: WorkspaceDto = await this.prisma.workspace.delete({
      where: { id },
    });

    return {
      message: `${workspace.title} has been deleted`,
      statusCode: '200',
    };
  }
}
