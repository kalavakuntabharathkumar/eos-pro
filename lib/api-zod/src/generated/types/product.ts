export interface Product {
  id: number;
  name: string;
  category: string;
  sku: string;
  stock: number;
  unit_price: number;
  status: string;
  /** @nullable */
  description?: string | null;
  /** @nullable */
  vendor?: string | null;
}
