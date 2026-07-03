export interface Workflow {
  id: number;
  name: string;
  /** @nullable */
  description?: string | null;
  trigger: string;
  status: string;
  runs: number;
  /** @nullable */
  last_run?: string | null;
  created_at: string;
}
