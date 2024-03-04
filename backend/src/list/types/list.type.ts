import { CreateCardDto } from 'src/card/dto/create-card.dto';

export type TList = {
  id: string;
  title: string;
  boardId: string;
  cards?: CreateCardDto[];
  createdAt: Date;
  updatedAt: Date;
};
