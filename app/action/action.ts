"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import z from "zod";
import { id } from "zod/v4/locales";

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

  const alatIdRaw = formData.get("inventaris");
  if (!alatIdRaw) throw new Error("Alat is required");

  const alatId = Number(alatIdRaw);

  const alat = await prisma.alat.findUnique({
    where: { id: alatId },
    select: { ruanganId: true }
  });

  if (!alat) throw new Error("Alat not found");

  const hasil = formData.get("hasil") as string;
  const settingAlat = formData.get("settingAlat")?.toString() || null;
  const terukur = formData.get("terukur")?.toString() || null;
  const teknisiIds = formData
    .getAll("teknisi")
    .map((id) => id.toString());
  console.log("teknisiIds:", teknisiIds);

  await prisma.ipm.create({
    data: {
      alatId,
      hasil,
      settingAlat,
      terukur,
      ruanganId: alat?.ruanganId,
      teknisi: teknisiIds
      // user: {
      //   connect: teknisiIds.map(id => ({ id }))
      // }
    },
  });

  revalidatePath("/dashboard/ipm");
  redirect("/dashboard/ipm");
};

export async function deleteIpm(id: number) {
  await prisma.ipm.delete({
    where: { id },
  })

  revalidatePath("/dashboard/inventaris")
}

export async function editIpm(ipmId: number, formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const hasil = formData.get("hasil")?.toString();
  const settingAlat = formData.get("settingAlat")?.toString() || null;
  const terukur = formData.get("terukur")?.toString() || null;

  if (!hasil) {
    throw new Error("Hasil is required");
  }

  const teknisiIds = formData
    .getAll("teknisi")
    .map((id) => id.toString())
    .filter(Boolean);

  await prisma.ipm.update({
    where: { id: ipmId },
    data: {
      hasil,
      settingAlat,
      terukur,
      teknisi: teknisiIds
      // user: {
      //   set: teknisiIds.map((id) => ({ id })),
      // },
    },
  });

  revalidatePath("/dashboard/ipm");
  redirect("/dashboard/ipm");
}