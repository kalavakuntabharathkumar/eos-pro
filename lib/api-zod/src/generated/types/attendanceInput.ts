export interface AttendanceInput {
  employee_id: number;
  date: string;
  check_in?: string;
  check_out?: string;
  status: string;
}
