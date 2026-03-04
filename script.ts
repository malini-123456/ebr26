import 'dotenv/config'
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });


async function main () {
  const alat = await prisma.alat.create ({
    data : {
      nama: "Tensimeter",
      merek: "Omron",
      tipe: "HEM-7121",
      noSeri: "123456789",
      ruangan: "IGD",
      tahun:"2016",
      kalibrasi: "2023-01-01",
      keterangan: "Alat dalam kondisi baik",
      // ipm: {
      //   create: {
      //     hasil: "OK",
      //     teknisi: "Alice",
      //     seeting: "50 mmHg",
      //     terukur: "49.5 mmHg",
      //     createdAt: new Date(),
      //   },
      // },
    }
  });
  console.log("Created Alat:", alat);

  const semuaAlat = await prisma.alat.findMany()

  console.log("Semua Alat:", semuaAlat);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
await prisma.$disconnect();
process.exit(1);
});