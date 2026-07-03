export interface PurchaseInput {
  vendor: string;
  product: string;
  quantity: number;
  unit_price: number;
  date: string;
  status?: string;
}
