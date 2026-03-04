
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";


export default async function ContributorsOverviewTable() {
  const getAlats = await prisma.alat.findMany();
  return (
    <div className="max-w-3xl mx-auto rounded-xl border border-border bg-background p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-foreground">Team Contributors</h2>
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Name</TableHead>
            <TableHead>Merek</TableHead>
            <TableHead>Tipe</TableHead>
            <TableHead>No Seri</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getAlats.map((item) => (
            <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">
              <TableCell className="font-medium">{item.nama}</TableCell>
              <TableCell>{item.merek}</TableCell>
              <TableCell>{item.noSeri}</TableCell>
              <TableCell className="text-right">{item.tipe}</TableCell>
            </TableRow>
          ))}

        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-right font-semibold">
              Total
            </TableCell>
            <TableCell className="text-right font-bold text-foreground">₹1,08,500</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  );
}

