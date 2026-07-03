export interface LeaveRequest {
  id: number;
  employee_id: number;
  employee_name: string;
  type: string;
  start_date: string;
  end_date: string;
  status: string;
  reason: string;
}
