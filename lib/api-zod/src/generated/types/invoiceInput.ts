export interface InvoiceInput {
  client: string;
  amount: number;
  status?: string;
  issue_date: string;
  due_date: string;
  description?: string;
}
