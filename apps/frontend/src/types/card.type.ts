export type TCard = {
  id: string;
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  listId: string;
  createdAt: Date;
  updatedAt: Date;
};
