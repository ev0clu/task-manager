import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { TActivity } from './types/activity.type';
import { CreateActivityDto } from './dto/create-activity.dto';

@Controller()
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('workspaces/:workspaceId/activities') // GET /workspaces/:workspaceId/activities
  @HttpCode(HttpStatus.OK)
  findAll(
    @Param('workspaceId') workspaceId: string,
  ): Promise<TActivity[]> | never {
    return this.activityService.findAll(workspaceId);
  }

  @Post('workspaces/:workspaceId/activities') // POST /workspaces/:workspaceId/activities
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('workspaceId') workspaceId: string,
    @Body(ValidationPipe)
    createActivityDto: CreateActivityDto,
  ): Promise<TActivity> {
    return this.activityService.create(workspaceId, createActivityDto);
  }
}
