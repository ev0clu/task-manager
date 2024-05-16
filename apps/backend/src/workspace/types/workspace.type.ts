import { CreateActivityDto } from 'src/activity/dto/create-activity.dto';
import { CreateBoardDto } from 'src/board/dto/create-board.dto';

export type TWorkspace = {
  id: string;
  title: string;
  boards?: CreateBoardDto[];
  activities?: CreateActivityDto[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
