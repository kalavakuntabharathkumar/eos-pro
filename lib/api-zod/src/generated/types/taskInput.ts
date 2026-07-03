export interface TaskInput {
  title: string;
  description?: string;
  status: string;
  priority: string;
  project_id?: number;
  assignee?: string;
  due_date?: string;
}
