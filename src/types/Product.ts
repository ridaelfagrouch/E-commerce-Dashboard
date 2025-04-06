export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  status: string;
  imageUrl: string;
  revenue: number;
  revenueValue: number;
  inventory: "in_stock" | "low_stock" | "out_of_stock";
  description?: string;
}
// ... existing code ...
