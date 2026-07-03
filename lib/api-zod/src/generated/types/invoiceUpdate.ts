export interface InvoiceUpdate {
  client?: string;
  amount?: number;
  status?: string;
  due_date?: string;
  description?: string;
}
