export interface WorkflowRun {
  workflow_id: number;
  status: string;
  timestamp: string;
  message?: string;
}
