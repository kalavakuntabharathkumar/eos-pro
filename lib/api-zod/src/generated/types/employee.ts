export interface Employee {
  id: number;
  name: string;
  email: string;
  /** @nullable */
  phone?: string | null;
  department: string;
  position: string;
  status: string;
  /** @nullable */
  salary?: number | null;
  joined_date: string;
  /** @nullable */
  avatar?: string | null;
  /** @nullable */
  location?: string | null;
}
