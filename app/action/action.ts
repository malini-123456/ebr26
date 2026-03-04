"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAlat(formData: FormData) {
  const nama = formData.get("nama") as string;
  const merek = formData.get("merek") as string;
  const tipe = formData.get("tipe") as string;
  const noSeri = formData.get("noSeri") as string;
  const ruanganId = Number(formData.get("ruanganId"));
  const tahun = Number(formData.get("tahun"));
  const kalibrasiValue = formData.get("kalibrasi") as string;
  const keterangan = formData.get("keterangan") as string | null;

  await prisma.alat.create({
    data: {
      nama,
      merek,
      tipe,
      noSeri,
      ruanganId, // ✅ use foreign key
      tahun,     // ✅ must be number
      kalibrasi: kalibrasiValue
        ? new Date(kalibrasiValue)
        : null,  // ✅ DateTime must be Date or null
      keterangan: keterangan || null,
    },
  });

  revalidatePath("/dashboard/inventaris");
  redirect("/dashboard/inventaris")
}