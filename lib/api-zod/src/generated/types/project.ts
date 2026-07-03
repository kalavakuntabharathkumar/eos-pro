export interface Project {
  id: number;
  name: string;
  /** @nullable */
  description?: string | null;
  status: string;
  progress: number;
  start_date: string;
  end_date: string;
  /** @nullable */
  manager?: string | null;
  team?: string[];
  /** @nullable */
  priority?: string | null;
}
