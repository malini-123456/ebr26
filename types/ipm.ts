// types.ts
export type Order = {
  id: string;
  customer: string;
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
  total: number; // in IDR
  createdAt: number; // ms timestamp
  updatedAt: number; // ms timestamp
};