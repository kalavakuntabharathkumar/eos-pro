import type { MonthlyRevenue } from './monthlyRevenue';
import type { StatusCount } from './statusCount';

export interface DashboardCharts {
  revenue_monthly: MonthlyRevenue[];
  tasks_by_status: StatusCount[];
  leads_by_stage: StatusCount[];
  expense_by_category: StatusCount[];
}
