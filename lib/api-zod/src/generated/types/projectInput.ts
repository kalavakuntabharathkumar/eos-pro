export interface ProjectInput {
  name: string;
  description?: string;
  status: string;
  progress?: number;
  start_date: string;
  end_date: string;
  manager?: string;
  priority?: string;
}
