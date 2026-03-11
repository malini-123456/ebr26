import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageContainer from "@/components/layout/page-container";
import Navbar from "@/components/floating-navbar";
import { prisma } from "@/lib/prisma";


export default async function AdminDashboard() {
  const pengguna = await prisma.user.findMany();

  return (
    <PageContainer>
      <Navbar />

      <div className="mx-auto my-28 rounded-xl border border-border bg-background p-4">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow className="flex justify-between">
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          { }
          <TableRow className="hover:bg-muted/40 transition-colors flex justify-between">
            <TableCell className="font-medium">nama</TableCell>
            <TableCell>email</TableCell>
            <TableCell>
              <span>
                role
              </span>
            </TableCell>
          </TableRow>
        </Table>
      </div>
    </PageContainer>
  );
}