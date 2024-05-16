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
import { BoardService } from './board.service';
import { TBoard } from './types/board.type';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller()
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('workspaces/:workspaceId/boards') // GET /workspaces/:workspaceId/boards
  @HttpCode(HttpStatus.OK)
  findAll(
    @Param('workspaceId') workspaceId: string,
  ): Promise<TBoard[]> | never {
    return this.boardService.findAll(workspaceId);
  }

  @Get('boards/:id') // GET /boards/:id
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<TBoard> | never {
    return this.boardService.findOne(id);
  }

  @Post('workspaces/:workspaceId/boards') // POST /workspaces/:workspaceId/boards
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('workspaceId') workspaceId: string,
    @Body(ValidationPipe)
    createBoardDto: CreateBoardDto,
  ): Promise<TBoard> {
    return this.boardService.create(workspaceId, createBoardDto);
  }

  @Put('boards/:id') // PUT /boards/:id
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateBoardDto: UpdateBoardDto,
  ): Promise<TBoard> {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete('boards/:id') // DELETE /boards/:id
  @HttpCode(HttpStatus.OK)
  delete(
    @Param('id') id: string,
  ): Promise<{ message: string; statusCode: string }> {
    return this.boardService.delete(id);
  }
}
