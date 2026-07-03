import type { StatusCount } from './statusCount';

export interface EmployeeStats {
  total: number;
  active: number;
  on_leave: number;
  by_department: StatusCount[];
}
