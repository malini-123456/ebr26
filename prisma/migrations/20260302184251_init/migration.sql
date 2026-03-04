-- CreateTable
CREATE TABLE "Alat" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "merek" TEXT NOT NULL,
    "tipe" TEXT NOT NULL,
    "no-seri" TEXT NOT NULL,
    "ruangan" TEXT NOT NULL,
    "tahun" TEXT NOT NULL,
    "kalibrasi" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,

    CONSTRAINT "Alat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ipm" (
    "IpmId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasil" TEXT NOT NULL,
    "teknisi" TEXT NOT NULL,
    "setting" TEXT NOT NULL,
    "terukur" TEXT NOT NULL,
    "alatId" INTEGER NOT NULL,

    CONSTRAINT "Ipm_pkey" PRIMARY KEY ("IpmId")
);

-- AddForeignKey
ALTER TABLE "Ipm" ADD CONSTRAINT "Ipm_alatId_fkey" FOREIGN KEY ("alatId") REFERENCES "Alat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
