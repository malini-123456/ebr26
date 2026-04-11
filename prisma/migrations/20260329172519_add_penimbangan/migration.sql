/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Ruangan` table. All the data in the column will be lost.
  - You are about to drop the `Teknisi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_IpmToTeknisi` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Ipm` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Teknisi" DROP CONSTRAINT "Teknisi_userId_fkey";

-- DropForeignKey
ALTER TABLE "_IpmToTeknisi" DROP CONSTRAINT "_IpmToTeknisi_A_fkey";

-- DropForeignKey
ALTER TABLE "_IpmToTeknisi" DROP CONSTRAINT "_IpmToTeknisi_B_fkey";

-- AlterTable
ALTER TABLE "Ipm" ADD COLUMN     "catatan" TEXT,
ADD COLUMN     "kelembapan" TEXT,
ADD COLUMN     "kelistrikan" TEXT,
ADD COLUMN     "suhu" TEXT,
ADD COLUMN     "teknisi" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Ruangan" DROP COLUMN "createdAt";

-- DropTable
DROP TABLE "Teknisi";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_IpmToTeknisi";

-- CreateTable
CREATE TABLE "Produk" (
    "id" SERIAL NOT NULL,
    "nama_produk" TEXT NOT NULL,
    "kode_produk" TEXT NOT NULL,
    "hasil_produk" TEXT NOT NULL,
    "satuan_produk" TEXT NOT NULL,
    "bentuk_produk" TEXT,
    "warna_produk" TEXT,
    "aroma_produk" TEXT,
    "ph_produk" TEXT,
    "homogenitas" TEXT,
    "foto_produk" TEXT[],
    "createdAtProduk" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAtProduk" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instruksi" (
    "id" SERIAL NOT NULL,
    "produkId" INTEGER NOT NULL,
    "langkah" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Instruksi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bahan" (
    "id" SERIAL NOT NULL,
    "produkId" INTEGER NOT NULL,
    "nama_bahan" TEXT NOT NULL,
    "jumlah_bahan" DOUBLE PRECISION NOT NULL,
    "satuan_bahan" TEXT NOT NULL,
    "createdAtBahan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAtBahan" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bahan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bets" (
    "id" SERIAL NOT NULL,
    "nomor_bets" TEXT NOT NULL,
    "produkId" INTEGER NOT NULL,
    "ukuran" DOUBLE PRECISION NOT NULL,
    "satuan" TEXT NOT NULL,
    "expiredDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspectionSession" (
    "id" TEXT NOT NULL,
    "betsId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InspectionSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChecklistTemplate" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ChecklistTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspectionItem" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "result" BOOLEAN NOT NULL DEFAULT false,
    "petugas" TEXT,
    "pengawas" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InspectionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PenimbanganSession" (
    "id" TEXT NOT NULL,
    "betsId" INTEGER NOT NULL,
    "catatan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PenimbanganSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PenimbanganItem" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "bahanId" INTEGER NOT NULL,
    "jmlDitimbang" DOUBLE PRECISION NOT NULL,
    "satuan" TEXT NOT NULL,
    "noBatchBahan" TEXT,
    "ditimbangOleh" TEXT,
    "diawasiOleh" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PenimbanganItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Produk_kode_produk_key" ON "Produk"("kode_produk");

-- CreateIndex
CREATE UNIQUE INDEX "Bets_nomor_bets_key" ON "Bets"("nomor_bets");

-- CreateIndex
CREATE UNIQUE INDEX "InspectionSession_betsId_key" ON "InspectionSession"("betsId");

-- CreateIndex
CREATE UNIQUE INDEX "ChecklistTemplate_label_key" ON "ChecklistTemplate"("label");

-- CreateIndex
CREATE UNIQUE INDEX "PenimbanganSession_betsId_key" ON "PenimbanganSession"("betsId");

-- AddForeignKey
ALTER TABLE "Instruksi" ADD CONSTRAINT "Instruksi_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bahan" ADD CONSTRAINT "Bahan_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bets" ADD CONSTRAINT "Bets_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspectionSession" ADD CONSTRAINT "InspectionSession_betsId_fkey" FOREIGN KEY ("betsId") REFERENCES "Bets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspectionItem" ADD CONSTRAINT "InspectionItem_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "InspectionSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspectionItem" ADD CONSTRAINT "InspectionItem_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "ChecklistTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenimbanganSession" ADD CONSTRAINT "PenimbanganSession_betsId_fkey" FOREIGN KEY ("betsId") REFERENCES "Bets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenimbanganItem" ADD CONSTRAINT "PenimbanganItem_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "PenimbanganSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenimbanganItem" ADD CONSTRAINT "PenimbanganItem_bahanId_fkey" FOREIGN KEY ("bahanId") REFERENCES "Bahan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
