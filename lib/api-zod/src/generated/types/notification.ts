export interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
  /** @nullable */
  link?: string | null;
}
