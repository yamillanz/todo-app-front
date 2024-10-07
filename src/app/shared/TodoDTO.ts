export interface TodoDTO {
  uuid?: string;
  userId?: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: string;
  completedAt?: string | null;
  status?: string;
}
