import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ListService } from './list.service';
import { TList } from './types/list.type';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Controller()
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get('boards/:boardId/lists') // GET /boards/:boardId/lists
  @HttpCode(HttpStatus.OK)
  findAll(@Param('boardId') boardId: string): Promise<TList[]> | never {
    return this.listService.findAll(boardId);
  }

  @Get('lists/:id') // GET /lists/:id
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<TList> | never {
    return this.listService.findOne(id);
  }

  @Post('boards/:boardId/lists') // POST /boards/:boardId/lists
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('boardId') boardId: string,
    @Body(ValidationPipe)
    createListDto: CreateListDto,
  ): Promise<TList> {
    return this.listService.create(boardId, createListDto);
  }

  @Put('lists/:id') // PUT /lists/:id
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateListDto: UpdateListDto,
  ): Promise<TList> {
    return this.listService.update(id, updateListDto);
  }

  @Delete('lists/:id') // DELETE /lists/:id
  @HttpCode(HttpStatus.OK)
  delete(
    @Param('id') id: string,
  ): Promise<{ message: string; statusCode: string }> {
    return this.listService.delete(id);
  }
}
