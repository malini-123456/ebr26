import { prisma } from "@/lib/prisma";
import { NoBarDataTable } from "./components/datatable-nobar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function UpcomingDataTable() {
  const getAlat = await prisma.alat.findMany({
    include: {
      ruangan: true,
    },
    where: {
      kalibrasi: {
        lt: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      }
    },
  });

  const totalItems = await prisma.alat.count({
    where: {
      kalibrasi: {
        lt: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      }
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Kalibrasi</CardTitle>
      </CardHeader>
      <CardContent>
        <NoBarDataTable data={getAlat} totalItems={totalItems} />
      </CardContent>
    </Card>
  )
}