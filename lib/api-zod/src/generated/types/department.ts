export interface Department {
  id: number;
  name: string;
  /** @nullable */
  head: string | null;
  employee_count: number;
  /** @nullable */
  description?: string | null;
}
