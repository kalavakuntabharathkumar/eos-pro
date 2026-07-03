export interface ExpenseInput {
  title: string;
  amount: number;
  category: string;
  date: string;
  status?: string;
  description?: string;
  submitted_by?: string;
}
