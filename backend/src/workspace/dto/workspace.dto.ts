export class WorkspaceDto {
  id: string;
  title: string;
  boards?: string[];
  activity?: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
