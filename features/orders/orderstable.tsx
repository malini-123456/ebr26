// src/features/orders/OrdersTable.tsx
'use client';

import * as React from 'react';
import { GenericDataTable } from '@/components/ui/table/generidata-table';
import { orderColumns, type Order } from './column';
import { getOrders } from './data';

export function OrdersTable() {
  const [data, setData] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      const orders = await getOrders();
      if (mounted) {
        setData(orders);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="p-4 text-sm text-muted-foreground">Loading orders…</div>;

  return (
    <GenericDataTable<Order>
      data={data}
      columns={orderColumns}
      dateFilter={{
        columnId: 'createdAt',
        title: 'Created At',
        multiple: true,
        valueType: 'number',
      }}
    />
  );
}