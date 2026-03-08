import { Ipm } from "@/lib/definitions/include-alat";

type PieSlice = { name: string; value: number };

export const getHasilDistribution = (rows: Ipm[]): PieSlice[] => {
  const counts: Record<string, number> = {};
  for (const r of rows) {
    const key = r.hasil || "UNKNOWN";
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
};