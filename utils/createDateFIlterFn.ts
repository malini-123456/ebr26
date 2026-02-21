// src/utils/createDateFilterFn.ts
import type { FilterFn } from '@tanstack/react-table';

/**
 * Generic date filter:
 * - Cell value must be number (ms timestamp) or string (parseable by Date)
 * - filterValue shapes supported:
 *   • undefined (no filter)
 *   • number (single day: matches 00:00–23:59 of that day)
 *   • [from?: number, to?: number] (range in ms)
 */
export const createDateFilterFn = <
  TData,
  TValue extends number | string = number | string
>(): FilterFn<TData> =>
  (row, columnId, filterValue) => {
    const cell = row.getValue<TValue | null | undefined>(columnId);
    if (cell == null) return false;

    const cellTs =
      typeof cell === 'number'
        ? cell
        : Number.isNaN(new Date(cell as string).getTime())
        ? NaN
        : new Date(cell as string).getTime();

    if (Number.isNaN(cellTs)) return false;
    if (!filterValue) return true;

    // Range case: [from, to]
    if (Array.isArray(filterValue)) {
      const [from, to] = filterValue as (number | undefined)[];
      if (from && to) return cellTs >= from && cellTs <= to;
      if (from && !to) return cellTs >= from;
      if (!from && to) return cellTs <= to;
      return true;
    }

    // Single date case: match same calendar day
    const dayStart = new Date(filterValue as number).setHours(0, 0, 0, 0);
    const dayEnd = new Date(filterValue as number).setHours(23, 59, 59, 999);
    return cellTs >= dayStart && cellTs <= dayEnd;
  };