import { z } from "zod";

export const inventoryBaseSchema = z.object({
  ruangan: z.string().min(1),
  nama_alat: z.string().min(1),
  merek: z.string().min(1),
  tipe: z.string(),
  no_seri: z.string().min(1),
  tanggal_kalibrasi: z.coerce.date().optional,
  tahun: z.number().min(1900).max(new Date().getFullYear()).optional,
  keterangan: z.string().optional,
})

export const inventorySchema = inventoryBaseSchema.extend({
  id: z.number(),
})

export type Inventory = z.infer<typeof inventorySchema>
export type CreateInventory = z.infer<typeof inventoryBaseSchema>