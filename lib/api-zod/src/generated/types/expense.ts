export interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
  status: string;
  /** @nullable */
  description?: string | null;
  /** @nullable */
  submitted_by?: string | null;
}
