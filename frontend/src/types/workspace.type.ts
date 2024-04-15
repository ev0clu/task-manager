import { TBoard } from './board.type';
import { TActivity } from './activity.type';

export type TWorkspace = {
  id: string;
  title: string;
  boards?: TBoard[];
  activities?: TActivity[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
