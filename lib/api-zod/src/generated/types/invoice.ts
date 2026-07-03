export interface Invoice {
  id: number;
  invoice_number: string;
  client: string;
  amount: number;
  status: string;
  issue_date: string;
  due_date: string;
  /** @nullable */
  description?: string | null;
}
