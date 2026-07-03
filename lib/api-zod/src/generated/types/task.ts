export interface Task {
  id: number;
  title: string;
  /** @nullable */
  description?: string | null;
  status: string;
  priority: string;
  /** @nullable */
  project_id?: number | null;
  /** @nullable */
  project_name?: string | null;
  /** @nullable */
  assignee?: string | null;
  /** @nullable */
  due_date?: string | null;
  created_at: string;
}
