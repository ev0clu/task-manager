import { TList } from './list.type';

export type TBoard = {
  id: string;
  title: string;
  color: string;
  workspaceId: string;
  lists?: TList[];
  createdAt: Date;
  updatedAt: Date;
};
