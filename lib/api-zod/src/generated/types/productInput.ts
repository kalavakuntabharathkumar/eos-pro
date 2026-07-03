export interface ProductInput {
  name: string;
  category: string;
  sku: string;
  stock: number;
  unit_price: number;
  status?: string;
  description?: string;
  vendor?: string;
}
