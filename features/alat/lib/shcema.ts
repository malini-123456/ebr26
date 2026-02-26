import { z } from "zod";

const optionalCoercedDate = z.preprocess((val) => {
  if (val === "" || val === null || val === undefined) return undefined;
  if (typeof val === "string" && /^\d{4}$/.test(val)) {
    return new Date(`${val}-01-01`);
  }
  return val;
}, z.coerce.date().optional());

const TahunSchema = z.preprocess((val) => {
  if (val === "" || val === null || val === undefined) return undefined;

  if (typeof val === "number") return val;

  if (typeof val === "string") {
    const yearOnly = val.match(/^\d{4}$/);
    if (yearOnly) return Number(val);
    const d = new Date(val);
    if (!isNaN(d.getTime())) return d.getFullYear();
  }

  // If Date
  if (val instanceof Date) return val.getFullYear();

  return val;
}, z.number().int().min(1900).max(new Date().getFullYear() + 1).optional());

export const AlatSchema = z.object({
  id_alat: z.string().min(1, "id_alat wajib"),
  nama_alat: z.string().min(2, "Nama minimal 2 karakter"),
  merek: z.string().min(1, "Merek wajib"),
  tipe: z.string().min(1, "Tipe wajib"),
  no_seri: z.string().min(1, "No. seri wajib"),
  ruangan: z.string().min(1, "Ruangan wajib"),
  tahun: TahunSchema, // → outputs a number like 2024
  tgl_kalibrasi: optionalCoercedDate, // → outputs Date | undefined
  keterangan: z.string().max(1000, "Maks 1000 karakter").optional().default(""),

  foto_alat: z.union([
    z.string().url("URL foto tidak valid").or(z.literal("")), // allow empty
    // If you want to accept File in the client form:
    // z.any() // you can refine to File in client-only code
  ]).optional().default(""),

  createdAt: optionalCoercedDate.or(z.coerce.date()), // allow omitted; server can set default
});

export type AlatInput = z.infer<typeof AlatSchema>;