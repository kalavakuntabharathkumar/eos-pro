export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  /** @nullable */
  phone?: string | null;
  status: string;
  stage: string;
  value: number;
  /** @nullable */
  assigned_to?: string | null;
  created_at: string;
}
