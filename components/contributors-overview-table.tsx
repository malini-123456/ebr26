"use client";
import { getIpmStatus } from "@/lib/ipm-status"
import { cn } from "@/lib/utils"
import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Prisma } from "@/generated/prisma/browser";
import { Badge } from "./ui/badge";

type AlatWithRuangan = Prisma.AlatGetPayload<{
  include: {
    ruangan: true,
    ipm: true
  };
}>;

interface Props {
  data: AlatWithRuangan[];
}

export default function ContributorsOverviewTableClient({ data }: Props) {
  const [search, setSearch] = useState("");

  const filtered = data.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.nama?.toLowerCase().includes(value) ||
      item.merek?.toLowerCase().includes(value) ||
      item.tipe?.toLowerCase().includes(value) ||
      item.noSeri?.toLowerCase().includes(value) ||
      item.ruangan?.namaRuangan?.toLowerCase().includes(value)
    );
  });

  return (
    <div className="max-w-3xl mx-auto bg-background p-4">
      <h4 className="mb-4 text-xl font-semibold text-foreground">
        Daftar Alat
      </h4>

      <Input
        placeholder="Search alat..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      <ScrollArea className="h-9/12 w-full rounded-md border">
        <Table className="table-fixed py-5">
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Merek</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>No Seri</TableHead>
              <TableHead>Ruangan</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.map((item) => {
              const status = getIpmStatus(item.ipm?.[0]?.createdAt);
              return (
                <TableRow key={item.id} className="hover:bg-muted/40">
                  <TableCell>
                    <Link href={`/dashboard/ipm/create?alatId=${item.id}`}>

                      <Badge
                        variant={
                          status === "good"
                            ? "default"
                            : status === "warning"
                              ? "secondary"
                              : "destructive"
                        }
                        className="ml-2"
                      >
                        {status === "good" && "Up to date"}
                        {status === "warning" && "Due soon"}
                        {status === "expired" && "> 180 days"}
                        {status === "danger" && "No date"}
                      </Badge>
                      <span
                        className={cn(
                          "hover:underline",
                          status === "expired" || status === "danger" ? "text-red-600" : "text-green-500"
                        )}
                      >
                        {item.nama}
                      </span>
                    </Link>
                  </TableCell>
                  <TableCell>{item.merek}</TableCell>
                  <TableCell>{item.tipe}</TableCell>
                  <TableCell>{item.noSeri}</TableCell>
                  <TableCell>{item.ruangan?.namaRuangan}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}