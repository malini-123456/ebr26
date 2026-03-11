import "dotenv/config"
import data from "./alat.json"

import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient, Prisma } from "@/generated/prisma/client"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
})

type JsonAlat = {
  nama: string
  merek: string | null
  tipe: string | null
  noSeri: string | null
  tahun: number
  kalibrasi: string | null
  keterangan: string | null
  ruanganId: number
}

function toOptionalInt(v: unknown): number | null {
  if (v === null || v === undefined) return null;
  if (typeof v === "string" && v.trim() === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function toRequiredInt(v: unknown, fieldName: string): number {
  if (v === null || v === undefined || (typeof v === "string" && v.trim() === "")) {
    throw new Error(`Missing required integer field "${fieldName}"`);
  }
  const n = Number(v);
  if (!Number.isFinite(n)) {
    throw new Error(`Invalid integer for "${fieldName}": ${v}`);
  }
  return n;
}

function toOptionalDate(v: unknown): Date | null {
  if (!v) return null;
  const d = new Date(String(v));
  return isNaN(d.getTime()) ? null : d;
}

function transform(item: JsonAlat): Prisma.AlatCreateManyInput {
  return {
    nama: item.nama,                          // required
    merek: item.merek ?? "",                // store NULL (not "")
    tipe: item.tipe ?? "",                  // store NULL
    noSeri: item.noSeri ?? "",              // store NULL (helps with uniqueness too)
    tahun: item.tahun,         // returns number or null (never NaN)
    kalibrasi: toOptionalDate(item.kalibrasi),// returns Date or null
    keterangan: item.keterangan ?? null,      // store NULL explicitly
    ruanganId: toRequiredInt(item.ruanganId, "ruanganId"), // must be a number
  };
}


async function main() {
  const rows: Prisma.AlatCreateManyInput[] = (data as JsonAlat[]).map(transform)

  await prisma.alat.createMany({
    data: rows,
    skipDuplicates: true,
  })

  console.log("Seed complete")
}

main()
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })