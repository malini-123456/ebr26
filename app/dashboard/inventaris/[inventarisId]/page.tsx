import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlatData } from "@/features/alat/alat";
import type { Alat } from "@/lib/definitions/tipe-alat";
import { prisma } from "@/lib/prisma";
import { Edit2Icon } from "lucide-react";

type PageProps = {
  params: Promise<{ inventarisId: string }>;
};

export default async function IpmPage({ params }: PageProps) {

  // const { inventarisId } = await params;
  // const getAlat = await prisma.alat.findMany({
  //   include: {
  //     ruangan: true,
  //   },
  // });

  // const items = [
  //   {
  //     title: "Nama Alat",
  //     value: getAlat.nama,
  //   },
  //   {
  //     title: "Merek",
  //     value: getAlat.merek,
  //   },
  //   {
  //     title: "Tipe",
  //     value: getAlat.tipe,
  //   },
  //   {
  //     title: "No. Seri",
  //     value: getAlat.noSeri,
  //   },
  //   {
  //     title: "Tahun",
  //     value: alat.tahun,
  //   },

  // ]

  return (
    <PageContainer
      pageHeaderAction={
        <Button className="bg-amber-300"
          variant="outline">
          <Edit2Icon />Edit
        </Button>
      }>
      <Card className="px-4 py-2">
        <CardContent className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
          <div className="order-2 md:order-1 space-y-4">
            {/* {items.map((item) => (
              <div key={item.title} className="flex items-center gap-6 md:gap-8">
                <div className="flex items-center gap-3">
                  <span className="font-semibold w-32 md:w-48">{item.title}</span>
                  <span className="w-72"></span>
                </div>
              </div>
            ))
            } */}
          </div>
          <h1>hewloo</h1>
          {/* <div className="divide-y border border-white">
            {items.map((item) => (
              <div key={item.title} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-blue-600">
                    {item.title}
                  </span>
                </div>

                
                <span className="text-muted-foreground">
                  {item.value}
                </span>
              </div>
            ))
          }
          </div> */}
        </CardContent>
      </Card>
    </PageContainer>
  );
}