-- AlterTable
ALTER TABLE "Bets" ADD COLUMN     "organizationId" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Produk" ADD COLUMN     "organizationId" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE INDEX "Bets_organizationId_idx" ON "Bets"("organizationId");

-- CreateIndex
CREATE INDEX "Produk_organizationId_idx" ON "Produk"("organizationId");
