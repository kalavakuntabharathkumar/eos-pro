export interface Purchase {
  id: number;
  vendor: string;
  product: string;
  quantity: number;
  unit_price?: number;
  total: number;
  date: string;
  status: string;
}
