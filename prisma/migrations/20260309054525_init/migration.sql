/*
  Warnings:

  - You are about to drop the column `no-seri` on the `Alat` table. All the data in the column will be lost.
  - You are about to drop the column `ruangan` on the `Alat` table. All the data in the column will be lost.
  - The `tahun` column on the `Alat` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `kalibrasi` column on the `Alat` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Ipm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `IpmId` on the `Ipm` table. All the data in the column will be lost.
  - You are about to drop the column `setting` on the `Ipm` table. All the data in the column will be lost.
  - You are about to drop the column `teknisi` on the `Ipm` table. All the data in the column will be lost.
  - Added the required column `ruanganId` to the `Alat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alat" DROP COLUMN "no-seri",
DROP COLUMN "ruangan",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "noSeri" TEXT,
ADD COLUMN     "ruanganId" INTEGER NOT NULL,
ALTER COLUMN "merek" DROP NOT NULL,
ALTER COLUMN "tipe" DROP NOT NULL,
DROP COLUMN "tahun",
ADD COLUMN     "tahun" INTEGER,
DROP COLUMN "kalibrasi",
ADD COLUMN     "kalibrasi" TIMESTAMP(3),
ALTER COLUMN "keterangan" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Ipm" DROP CONSTRAINT "Ipm_pkey",
DROP COLUMN "IpmId",
DROP COLUMN "setting",
DROP COLUMN "teknisi",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "ruanganId" INTEGER,
ADD COLUMN     "settingAlat" TEXT,
ALTER COLUMN "terukur" DROP NOT NULL,
ADD CONSTRAINT "Ipm_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "role" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teknisi" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Teknisi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ruangan" (
    "id" SERIAL NOT NULL,
    "namaRuangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ruangan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IpmToTeknisi" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_IpmToTeknisi_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Teknisi_userId_key" ON "Teknisi"("userId");

-- CreateIndex
CREATE INDEX "_IpmToTeknisi_B_index" ON "_IpmToTeknisi"("B");

-- AddForeignKey
ALTER TABLE "Teknisi" ADD CONSTRAINT "Teknisi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alat" ADD CONSTRAINT "Alat_ruanganId_fkey" FOREIGN KEY ("ruanganId") REFERENCES "Ruangan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ipm" ADD CONSTRAINT "Ipm_ruanganId_fkey" FOREIGN KEY ("ruanganId") REFERENCES "Ruangan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IpmToTeknisi" ADD CONSTRAINT "_IpmToTeknisi_A_fkey" FOREIGN KEY ("A") REFERENCES "Ipm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IpmToTeknisi" ADD CONSTRAINT "_IpmToTeknisi_B_fkey" FOREIGN KEY ("B") REFERENCES "Teknisi"("id") ON DELETE CASCADE ON UPDATE CASCADE;
