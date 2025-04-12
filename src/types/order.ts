export interface Order {
  id: string;
  customer:
    | {
        name: string;
        email?: string;
        phone?: string;
      }
    | string;
  date: string;
  status: "completed" | "processing" | "pending" | "cancelled";
  total?: number;
  amount?: number;
  items:
    | Array<{
        id: string;
        name: string;
        quantity: number;
        price: number;
      }>
    | number;
}
