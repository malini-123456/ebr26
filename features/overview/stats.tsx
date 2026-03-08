
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { prisma } from "@/lib/prisma";
import { IconHospital } from "@tabler/icons-react";
import Image from "next/image"

export async function SectionCards() {
  const hitungalat = await prisma.alat.count();


  const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const end = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

  const hitungipmmothly = await prisma.ipm.count({
    where: { createdAt: { gte: start, lt: end } },
  });

  const perlukalibrasi = await prisma.alat.count({
    where: {
      kalibrasi: {
        lt: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      }
    },
  });


  return (
    <div className="
    grid grid-cols-1 md:grid-cols-3 rounded-xl gap-3">
      <Card className="@container/card rounded-xl ">
        <CardHeader className="relative">
          <CardDescription>Total Alat</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {hitungalat}
          </CardTitle>
        </CardHeader>

      </Card>
      <Card className="@container/card rounded-xl">
        <CardHeader className="relative">
          <CardDescription>IPM Bulan ini</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {hitungipmmothly}
          </CardTitle>
        </CardHeader>

      </Card>
      <Card className="@container/card rounded-xl">
        <CardHeader className="relative">
          <CardDescription>Perlu Kalibrasi</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {perlukalibrasi}
          </CardTitle>
        </CardHeader>

      </Card>
    </div>
  )
}
