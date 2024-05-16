import { CreateListDto } from 'src/list/dto/create-list.dto';

export type TBoard = {
  id: string;
  title: string;
  color: string;
  workspaceId: string;
  lists?: CreateListDto[];
  createdAt: Date;
  updatedAt: Date;
};
