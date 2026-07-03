export interface Milestone {
  id: number;
  title: string;
  project_id: number;
  /** @nullable */
  project_name?: string | null;
  due_date: string;
  status: string;
  /** @nullable */
  description?: string | null;
}
