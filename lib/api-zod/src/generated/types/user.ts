export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  /** @nullable */
  avatar?: string | null;
  created_at?: string;
}
