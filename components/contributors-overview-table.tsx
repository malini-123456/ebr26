import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { ScrollArea } from "./ui/scroll-area";

export default async function ContributorsOverviewTable() {
  const getAlats = await prisma.alat.findMany({
    include: {
      ruangan: true,
    },
  });
  return (
    <div className="max-w-3xl mx-auto bg-background p-4">
      <h4 className="mb-4 text-xl font-semibold text-foreground">Daftar Alat</h4>
      <ScrollArea>
        <Table className="table-fixed py-5">
          <TableHeader className="bg-neutral-300">
            <TableRow>
              <TableHead className="font-semibold">Nama</TableHead>
              <TableHead className="font-semibold">Merek</TableHead>
              <TableHead className="font-semibold">Tipe</TableHead>
              <TableHead className="font-semibold">No Seri</TableHead>
              <TableHead className="font-semibold">Ruangan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getAlats.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">
                <TableCell>
                  <span className="text-emerald-500">{item.nama}</span>
                </TableCell>
                <TableCell>{item.merek}</TableCell>
                <TableCell>{item.tipe}</TableCell>
                <TableCell>{item.noSeri}</TableCell>
                <TableCell>{item.ruanganId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}