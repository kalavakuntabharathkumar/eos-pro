export interface DealInput {
  title: string;
  contact: string;
  company?: string;
  value: number;
  stage: string;
  probability?: number;
  close_date: string;
  assigned_to?: string;
}
