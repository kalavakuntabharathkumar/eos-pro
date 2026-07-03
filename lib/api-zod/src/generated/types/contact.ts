export interface Contact {
  id: number;
  name: string;
  email: string;
  /** @nullable */
  phone?: string | null;
  company: string;
  /** @nullable */
  role?: string | null;
  /** @nullable */
  avatar?: string | null;
  created_at: string;
}
