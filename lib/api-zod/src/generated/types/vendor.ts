export interface Vendor {
  id: number;
  name: string;
  email: string;
  /** @nullable */
  phone?: string | null;
  /** @nullable */
  address?: string | null;
  status: string;
  /** @nullable */
  category?: string | null;
}
