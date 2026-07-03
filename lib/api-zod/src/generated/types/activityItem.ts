export interface ActivityItem {
  id: number;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  /** @nullable */
  user?: string | null;
}
