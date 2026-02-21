// src/features/orders/data.ts
import type { Order } from './column';

// Example: mock data (replace with your fetch logic)
export const getOrders = async (): Promise<Order[]> => {
  // Simulate fetch delay
  await new Promise((r) => setTimeout(r, 50));
  const now = Date.now();
  return [
    {
      id: 'ORD-1001',
      customer: 'Alice',
      total: 120.5,
      createdAt: now - 1000 * 60 * 60 * 24 * 2, // 2 days ago
      status: 'pending',
    },
    {
      id: 'ORD-1002',
      customer: 'Bob',
      total: 75.0,
      createdAt: now - 1000 * 60 * 60 * 24 * 7, // 7 days ago
      status: 'shipped',
    },
    {
      id: 'ORD-1003',
      customer: 'Cara',
      total: 250.99,
      createdAt: now,
      status: 'delivered',
    },
  ];
};