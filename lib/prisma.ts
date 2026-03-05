import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

console.log('DATABASE_URL =', process.env.DATABASE_URL);

export { prisma };

export async function deleteAlat(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return prisma.alat.delete({
    where: { id },
  });
}