"use server";
import { writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

///// PROSES 1 /////

const checklistKeys = [
  "ruangandibersihkan",
  "statuskebersihan",
  "alatproduksi",
  "alatdibersihkan",
  "alatbekerja",
  "bahancukup",
  "bahanlengkap",
  "bahanjumlah",
  "batchrecord",
] as const

export async function saveProses1(betsId: number, formData: FormData) {
  const session = await prisma.inspectionSession.upsert({
    where: { betsId },
    update: {},
    create: { betsId },
  })

  // Remove old items so we can write fresh values
  await prisma.inspectionItem.deleteMany({ where: { sessionId: session.id } })

  for (let i = 0; i < checklistKeys.length; i++) {
    const key = checklistKeys[i]
    const template = await prisma.checklistTemplate.upsert({
      where: { label: key },
      update: {},
      create: { label: key, order: i },
    })

    await prisma.inspectionItem.create({
      data: {
        sessionId: session.id,
        templateId: template.id,
        result: formData.get(`pemeriksaan_${key}`) === "ya",
        petugas: formData.get(`petugas_${key}`) as string,
        pengawas: formData.get(`pengawas_${key}`) as string,
      },
    })
  }

  revalidatePath(`/bets`)
  redirect(`/bets/penimbangan/${betsId}`)
}

///// PENIMBANGAN /////

export async function savePenimbangan(betsId: number, formData: FormData) {
  const bets = await prisma.bets.findUnique({
    where: { id: betsId },
    include: { produk: { include: { bahan: true } } },
  })
  if (!bets) throw new Error("Bets not found")

  const session = await prisma.penimbanganSession.upsert({
    where: { betsId },
    update: { catatan: formData.get("catatan_penimbangan") as string },
    create: { betsId, catatan: formData.get("catatan_penimbangan") as string },
  })

  await prisma.penimbanganItem.deleteMany({ where: { sessionId: session.id } })

  for (const b of bets.produk.bahan) {
    const jmlDitimbang = Number(formData.get(`jml_ditimbang_${b.id}`))
    const satuan = formData.get(`satuan_${b.id}`) as string
    const noBatchBahan = formData.get(`no_batch_bahan_${b.id}`) as string
    const ditimbangOleh = formData.get(`ditimbang_oleh_${b.id}`) as string
    const diawasiOleh = formData.get(`diawasi_oleh_${b.id}`) as string

    await prisma.penimbanganItem.create({
      data: {
        sessionId: session.id,
        bahanId: b.id,
        jmlDitimbang,
        satuan,
        noBatchBahan: noBatchBahan || null,
        ditimbangOleh: ditimbangOleh || null,
        diawasiOleh: diawasiOleh || null,
      },
    })
  }

  revalidatePath(`/bets`)
  redirect(`/bets`)
}

///// BETS /////

export async function CreateBets(formData: FormData) {
  const nomor_bets = formData.get("nomor_bets") as string;
  const produkId = Number(formData.get("produkId"));
  const ukuran = Number(formData.get("ukuran"));
  const satuan = formData.get("satuan") as string;
  const expiredDate = formData.get("expiredDate") as string;

  await prisma.bets.create({
    data: {
      nomor_bets,
      produkId,
      ukuran,
      satuan,
      expiredDate: new Date(expiredDate),
    },
  });

  revalidatePath("/home");
  redirect("/home");
};

export async function deleteBets(id: number) {
  const inspSession = await prisma.inspectionSession.findUnique({ where: { betsId: id } })
  if (inspSession) {
    await prisma.inspectionItem.deleteMany({ where: { sessionId: inspSession.id } })
    await prisma.inspectionSession.delete({ where: { id: inspSession.id } })
  }

  await prisma.penimbanganSession.deleteMany({ where: { betsId: id } })

  await prisma.bets.delete({ where: { id } })
  revalidatePath("/bets")
}

//////// PRODUK /////////

export async function CreateProduk(formData: FormData) {
  const nama_produk = formData.get("nama_produk") as string;
  const kode_produk = formData.get("kode_produk") as string;
  const hasil_produk = formData.get("hasil_produk") as string;
  const satuan_produk = formData.get("satuan_produk") as string;
  const bentuk_produk = formData.get("bentuk_produk") as string;
  const warna_produk = formData.get("warna_produk") as string;
  const aroma_produk = formData.get("aroma_produk") as string;
  const ph_produk = formData.get("ph_produk") as string;
  const homogenitas = formData.get("homogenitas") as string;
  const foto_produk = formData.getAll("foto_produk") as string[];

  await prisma.produk.create({
    data: {
      nama_produk,
      kode_produk,
      hasil_produk,
      satuan_produk,
      bentuk_produk,
      warna_produk,
      aroma_produk,
      ph_produk,
      homogenitas,
      foto_produk,
    },
  });

  revalidatePath("/produk");
  redirect("/produk");
}

export async function uploadFoto(formData: FormData): Promise<string[]> {
  const files = formData.getAll("files") as File[];
  const urls: string[] = [];

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);
    await writeFile(filePath, buffer);
    urls.push(`/uploads/${fileName}`);
  }

  return urls;
}

export async function editProduk(id: number, formData: FormData) {
  const nama_produk = formData.get("nama_produk") as string;
  const kode_produk = formData.get("kode_produk") as string;
  const hasil_produk = formData.get("hasil_produk") as string;
  const satuan_produk = formData.get("satuan_produk") as string;
  const bentuk_produk = formData.get("bentuk_produk") as string;
  const warna_produk = formData.get("warna_produk") as string;
  const aroma_produk = formData.get("aroma_produk") as string;
  const ph_produk = formData.get("ph_produk") as string;
  const homogenitas = formData.get("homogenitas") as string;
  const foto_produk = formData.getAll("foto_produk") as string[];

  await prisma.produk.update({
    where: { id },
    data: {
      nama_produk,
      kode_produk,
      hasil_produk,
      satuan_produk,
      bentuk_produk,
      warna_produk,
      aroma_produk,
      ph_produk,
      homogenitas,
      foto_produk,
    },
  });

  revalidatePath("/produk");
  redirect("/produk");
}

export async function deleteProduk(id: number) {
  await prisma.$transaction(async (tx) => {
    const betsList = await tx.bets.findMany({ where: { produkId: id }, select: { id: true } })
    const betsIds = betsList.map((b) => b.id)

    const inspSessions = await tx.inspectionSession.findMany({
      where: { betsId: { in: betsIds } },
      select: { id: true },
    })
    await tx.inspectionItem.deleteMany({ where: { sessionId: { in: inspSessions.map((s) => s.id) } } })
    await tx.inspectionSession.deleteMany({ where: { betsId: { in: betsIds } } })

    // PenimbanganItem cascades from PenimbanganSession
    await tx.penimbanganSession.deleteMany({ where: { betsId: { in: betsIds } } })

    await tx.bets.deleteMany({ where: { produkId: id } })

    await tx.bahan.deleteMany({ where: { produkId: id } })

    // Instruksi cascades automatically
    await tx.produk.delete({ where: { id } })
  })

  revalidatePath("/produk")
}

///// BAHAN /////

export async function createBahan(produkId: number, formData: FormData) {
  const nama_bahan = formData.get("nama_bahan") as string;
  const jumlah_bahan = Number(formData.get("jumlah_bahan"));
  const satuan_bahan = formData.get("satuan_bahan") as string;

  await prisma.bahan.create({
    data: { produkId, nama_bahan, jumlah_bahan, satuan_bahan },
  });

  revalidatePath(`/produk/${produkId}`);
  redirect(`/produk/${produkId}`);
}

export async function editBahan(id: number, produkId: number, formData: FormData) {
  const nama_bahan = formData.get("nama_bahan") as string;
  const jumlah_bahan = Number(formData.get("jumlah_bahan"));
  const satuan_bahan = formData.get("satuan_bahan") as string;

  await prisma.bahan.update({
    where: { id },
    data: { nama_bahan, jumlah_bahan, satuan_bahan },
  });

  revalidatePath(`/produk/${produkId}`);
  redirect(`/produk/${produkId}`);
}

export async function deleteBahan(id: number, produkId: number) {
  await prisma.bahan.delete({ where: { id } });
  revalidatePath(`/produk/${produkId}`);
}

///// INSTRUKSI /////

export async function createInstruksi(produkId: number, formData: FormData) {
  const langkah = formData.get("langkah") as string;

  await prisma.instruksi.create({
    data: { produkId, langkah },
  });

  revalidatePath(`/produk/${produkId}`);
  redirect(`/produk/${produkId}`);
}

export async function editInstruksi(id: number, produkId: number, formData: FormData) {
  const langkah = formData.get("langkah") as string;

  await prisma.instruksi.update({
    where: { id },
    data: { langkah },
  });

  revalidatePath(`/produk/${produkId}`);
  redirect(`/produk/${produkId}`);
}

export async function deleteInstruksi(id: number, produkId: number) {
  await prisma.instruksi.delete({ where: { id } });
  revalidatePath(`/produk/${produkId}`);
}


// export async function createAlat(formData: FormData) {
//   const nama = formData.get("nama") as string;
//   const merek = formData.get("merek") as string;
//   const tipe = formData.get("tipe") as string;
//   const noSeri = formData.get("noSeri") as string;
//   const ruanganId = Number(formData.get("ruanganId"));
//   const tahun = Number(formData.get("tahun"));
//   const kalibrasiValue = formData.get("kalibrasi") as string;
//   const keterangan = formData.get("keterangan") as string | null;

//   await prisma.alat.create({
//     data: {
//       nama,
//       merek,
//       tipe,
//       noSeri,
//       ruanganId,
//       tahun,
//       kalibrasi: kalibrasiValue
//         ? new Date(kalibrasiValue)
//         : null,
//       keterangan: keterangan || null,
//     },
//   });

//   revalidatePath("/dashboard/inventaris");
//   redirect("/dashboard/inventaris")
// };

// export async function editAlat(id: number, formData: FormData) {

//   const nama = formData.get("nama") as string;
//   const merek = formData.get("merek") as string;
//   const tipe = formData.get("tipe") as string;
//   const noSeri = formData.get("noSeri") as string;
//   const ruanganId = Number(formData.get("ruanganId"));
//   const tahun = Number(formData.get("tahun"));
//   const kalibrasiValue = formData.get("kalibrasi") as string;
//   const keterangan = formData.get("keterangan") as string | null;

//   await prisma.alat.update({
//     where: { id },
//     data: {
//       nama,
//       merek,
//       tipe,
//       noSeri,
//       ruanganId,
//       tahun,
//       kalibrasi: kalibrasiValue
//         ? new Date(kalibrasiValue)
//         : null,
//       keterangan: keterangan || null,

//     }
//   }).catch(() => {
//     throw new Error("Alat not found")
//   })
//   revalidatePath("/dashboard/inventaris");
//   redirect("/dashboard/inventaris");
// };

// export async function deleteAlat(id: number) {
//   await prisma.alat.delete({
//     where: { id },
//   })

//   revalidatePath("/dashboard/inventaris")
// }

// export async function createipm(formData: FormData) {
//   const { userId } = await auth();

//   if (!userId) {
//     throw new Error("Unauthorized");
//   }

//   const alatIdRaw = formData.get("inventaris");
//   if (!alatIdRaw) throw new Error("Alat is required");

//   const alatId = Number(alatIdRaw);

//   const alat = await prisma.alat.findUnique({
//     where: { id: alatId },
//     select: { ruanganId: true }
//   });

//   if (!alat) throw new Error("Alat not found");

//   const hasil = formData.get("hasil") as string;
//   const settingAlat = formData.get("settingAlat")?.toString() || null;
//   const terukur = formData.get("terukur")?.toString() || null;
//   const suhu = formData.get("suhu")?.toString() || null;
//   const kelembapan = formData.get("kelembapan")?.toString() || null;
//   const kelistrikan = formData.get("kelistrikan")?.toString() || null;
//   const catatan = formData.get("catatan")?.toString() || null;
//   const teknisiIds = formData
//     .getAll("teknisi")
//     .map((id) => id.toString());
//   console.log("teknisiIds:", teknisiIds);

//   await prisma.ipm.create({
//     data: {
//       alatId,
//       hasil,
//       settingAlat,
//       terukur,
//       suhu,
//       kelembapan,
//       kelistrikan,
//       catatan,
//       ruanganId: alat?.ruanganId,
//       teknisi: teknisiIds
//       // user: {
//       //   connect: teknisiIds.map(id => ({ id }))
//       // }
//     },
//   });

//   revalidatePath("/dashboard/ipm");
//   redirect("/dashboard/ipm");
// };

export async function deleteIpm(id: number) {
  await prisma.ipm.delete({
    where: { id },
  })

  revalidatePath("/dashboard/inventaris")
}

// export async function editIpm(ipmId: number, formData: FormData) {
//   const { userId } = await auth();

//   if (!userId) {
//     throw new Error("Unauthorized");
//   }

//   const hasil = formData.get("hasil")?.toString();
//   const settingAlat = formData.get("settingAlat")?.toString() || null;
//   const terukur = formData.get("terukur")?.toString() || null;
//   const suhu = formData.get("suhu")?.toString() || null;
//   const kelembapan = formData.get("kelembapan")?.toString() || null;
//   const kelistrikan = formData.get("kelistrikan")?.toString() || null;
//   const catatan = formData.get("catatan")?.toString() || null;

//   if (!hasil) {
//     throw new Error("Hasil is required");
//   }

//   const teknisiIds = formData
//     .getAll("teknisi")
//     .map((id) => id.toString())
//     .filter(Boolean);

//   await prisma.ipm.update({
//     where: { id: ipmId },
//     data: {
//       hasil,
//       settingAlat,
//       terukur,
//       suhu,
//       kelembapan,
//       kelistrikan,
//       catatan,
//       teknisi: teknisiIds
//       // user: {
//       //   set: teknisiIds.map((id) => ({ id })),
//       // },
//     },
//   });

//   revalidatePath("/dashboard/ipm");
//   redirect("/dashboard/ipm");
// }