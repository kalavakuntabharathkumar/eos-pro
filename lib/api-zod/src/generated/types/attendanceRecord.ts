export interface AttendanceRecord {
  id: number;
  employee_id: number;
  employee_name: string;
  date: string;
  /** @nullable */
  check_in: string | null;
  /** @nullable */
  check_out?: string | null;
  status: string;
}
