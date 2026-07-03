import type { KpiMetric } from './kpiMetric';
import type { MonthlyRevenue } from './monthlyRevenue';

export interface AnalyticsOverview {
  kpis: KpiMetric[];
  performance: MonthlyRevenue[];
}
