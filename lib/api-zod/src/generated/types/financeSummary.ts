import type { MonthlyRevenue } from './monthlyRevenue';

export interface FinanceSummary {
  total_revenue: number;
  total_expenses: number;
  net_profit: number;
  pending_amount: number;
  revenue_trend?: MonthlyRevenue[];
}
