export interface MilestoneInput {
  title: string;
  project_id: number;
  due_date: string;
  status?: string;
  description?: string;
}
