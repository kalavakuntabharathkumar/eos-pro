export interface Deal {
  id: number;
  title: string;
  contact: string;
  /** @nullable */
  company?: string | null;
  value: number;
  stage: string;
  /** @nullable */
  probability?: number | null;
  close_date: string;
  /** @nullable */
  assigned_to?: string | null;
  created_at: string;
}
