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
import { CardService } from './card.service';
import { TCard } from './types/card.type';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller()
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('lists/:listId/cards') // GET /lists/:listId/cards
  @HttpCode(HttpStatus.OK)
  findAll(@Param('listId') listId: string): Promise<TCard[]> | never {
    return this.cardService.findAll(listId);
  }

  @Get('cards/:id') // GET /cards/:id
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<TCard> | never {
    return this.cardService.findOne(id);
  }

  @Post('lists/:listId/cards') // POST /lists/:listId/cards
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('listId') listId: string,
    @Body(ValidationPipe)
    createCardDto: CreateCardDto,
  ): Promise<TCard> {
    return this.cardService.create(listId, createCardDto);
  }

  @Put('cards/:id') // PUT /cards/:id
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCardDto: UpdateCardDto,
  ): Promise<TCard> {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete('cards/:id') // DELETE /cards/:id
  @HttpCode(HttpStatus.OK)
  delete(
    @Param('id') id: string,
  ): Promise<{ message: string; statusCode: string }> {
    return this.cardService.delete(id);
  }
}
