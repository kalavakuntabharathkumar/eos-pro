export interface LeadInput {
  name: string;
  company: string;
  email: string;
  phone?: string;
  status?: string;
  stage: string;
  value: number;
  assigned_to?: string;
}
