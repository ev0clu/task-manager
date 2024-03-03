import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
  ValidationPipe,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Workspace } from '@prisma/client';
import { Request } from 'express';
import { WorkspaceDto } from './dto/workspace.dto';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get() // GET /workspace/:id
  @HttpCode(HttpStatus.OK)
  findAll(@Req() req: Request): Promise<Workspace[]> | never {
    const user = req.user;
    return this.workspaceService.findAll(user['sub']);
  }

  @Get(':id') // GET /workspace/:id
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<Workspace> | never {
    return this.workspaceService.findOne(id);
  }

  @Post() // POST /workspace
  @HttpCode(HttpStatus.CREATED)
  create(
    @Req() req: Request,
    @Body(ValidationPipe) createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<WorkspaceDto> {
    const user = req.user;
    return this.workspaceService.create(createWorkspaceDto, user['sub']);
  }

  @Put(':id') // PUT /workspace/:id
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateWorkspaceDto: UpdateWorkspaceDto,
  ): Promise<WorkspaceDto> {
    return this.workspaceService.update(id, updateWorkspaceDto);
  }

  @Delete(':id') // DELETE /workspace/:id
  @HttpCode(HttpStatus.OK)
  delete(
    @Param('id') id: string,
  ): Promise<{ message: string; statusCode: string }> {
    return this.workspaceService.delete(id);
  }
}
