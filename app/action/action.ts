"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import z from "zod";

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
      ruanganId,
      tahun,
      kalibrasi: kalibrasiValue
        ? new Date(kalibrasiValue)
        : null,
      keterangan: keterangan || null,
    },
  });

  revalidatePath("/dashboard/inventaris");
  redirect("/dashboard/inventaris")
};

export async function editAlat(id: number, formData: FormData) {

  const nama = formData.get("nama") as string;
  const merek = formData.get("merek") as string;
  const tipe = formData.get("tipe") as string;
  const noSeri = formData.get("noSeri") as string;
  const ruanganId = Number(formData.get("ruanganId"));
  const tahun = Number(formData.get("tahun"));
  const kalibrasiValue = formData.get("kalibrasi") as string;
  const keterangan = formData.get("keterangan") as string | null;

  await prisma.alat.update({
    where: { id },
    data: {
      nama,
      merek,
      tipe,
      noSeri,
      ruanganId,
      tahun,
      kalibrasi: kalibrasiValue
        ? new Date(kalibrasiValue)
        : null,
      keterangan: keterangan || null,

    }
  }).catch(() => {
    throw new Error("Alat not found")
  })
  revalidatePath("/dashboard/inventaris");
  redirect("/dashboard/inventaris");
};

export async function deleteAlat(id: number) {
  await prisma.alat.delete({
    where: { id },
  })

  revalidatePath("/dashboard/inventaris")
}

export async function createipm(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { teknisi: true },
  });

  if (!user || !user.teknisi) {
    throw new Error("Teknisi profile not found");
  }

  const alatIdRaw = formData.get("inventaris");
  if (!alatIdRaw) throw new Error("Alat is required");

  const alatId = Number(alatIdRaw);
  const hasil = formData.get("hasil") as string;
  const settingAlat = formData.get("settingAlat") as string || null;
  const terukur = formData.get("terukur") as string || null;

  // await prisma.ipm.create({
  //   data: {
  //     alatId,
  //     teknisiId: user.teknisi.id,
  //     hasil,
  //     settingAlat: settingAlat || null,
  //     terukur: terukur || null,
  //   },
  // });

  revalidatePath("/dashboard/ipm");
  redirect("/dashboard/ipm");
}