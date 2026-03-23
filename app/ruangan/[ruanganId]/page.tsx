import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlatSearchInput } from "@/components/alat-search-input";
import { AlatPagination } from "@/components/alat-pagination";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

const PAGE_SIZE = 10;

export default async function DetailRuangan({
  params,
  searchParams,
}: {
  params: Promise<{ ruanganId: string }>
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const { ruanganId } = await params;
  const { q, page: pageParam } = await searchParams;
  const id = Number(ruanganId);
  const page = Math.max(1, Number(pageParam) || 1);
  const search = q?.trim() ?? "";

  // Stats use full unfiltered data
  const ruangan = await prisma.ruangan.findUnique({
    where: { id },
    include: {
      alat: { include: { ipm: { orderBy: { createdAt: "desc" }, take: 1 } } },
      ipm: { orderBy: { createdAt: "desc" } },
    },
  });

  const totalAlat = ruangan?.alat.length ?? 0;
  const totalIpm = ruangan?.ipm.length ?? 0;
  const alatWithIpm = ruangan?.alat.filter((a) => a.ipm.length > 0).length ?? 0;
  const ipmPercent = totalAlat > 0 ? Math.round((alatWithIpm / totalAlat) * 100) : 0;
  const lastIpm = ruangan?.ipm[0]?.createdAt ?? null;
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const perluKalibrasi = ruangan?.alat.filter(
    (a) => a.kalibrasi !== null && a.kalibrasi < oneYearAgo
  ).length ?? 0;
  const ipmOk = ruangan?.ipm.filter((i) => i.hasil === "Alat Dapat Digunakan").length ?? 0;
  const ipmFail = totalIpm - ipmOk;

  // Filtered + paginated alat for the table
  const searchFilter = search
    ? {
      OR: [
        { nama: { contains: search, mode: "insensitive" as const } },
        { merek: { contains: search, mode: "insensitive" as const } },
        { tipe: { contains: search, mode: "insensitive" as const } },
        { noSeri: { contains: search, mode: "insensitive" as const } },
      ],
    }
    : {};

  const [filteredAlat, filteredCount] = await Promise.all([
    prisma.alat.findMany({
      where: { ruanganId: id, ...searchFilter },
      include: { ipm: { orderBy: { createdAt: "desc" }, take: 1 } },
      orderBy: { nama: "asc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.alat.count({ where: { ruanganId: id, ...searchFilter } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredCount / PAGE_SIZE));

  return (
    <div className="flex flex-col gap-6">

      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-semibold">{ruangan?.namaRuangan ?? "Ruangan"}</h1>
        <p className="text-muted-foreground text-sm">{totalAlat} alat terdaftar</p>
      </div>

      {/* Stat cards */}
      <div className="flex flex-wrap gap-3">

        <Card className="@container/card flex-1 min-w-55">
          <CardHeader className="relative">
            <CardDescription>Cakupan IPM</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {ipmPercent}%
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              {alatWithIpm} / {totalAlat} alat sudah IPM
            </p>
            <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{ width: `${ipmPercent}%` }}
              />
            </div>
          </CardHeader>
        </Card>

        <Card className="@container/card flex-1 min-w-40">
          <CardHeader>
            <CardDescription>Total IPM</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {totalIpm}
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              <span className="text-emerald-500">{ipmOk} baik</span>
              {" · "}
              <span className="text-destructive">{ipmFail} Tidak dapat digunakan</span>
            </p>
          </CardHeader>
        </Card>

        <Card className="@container/card flex-1 min-w-40">
          <CardHeader>
            <CardDescription>IPM Terakhir</CardDescription>
            <CardTitle className="@[250px]/card:text-2xl text-xl font-semibold">
              {lastIpm
                ? lastIpm.toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                : "—"}
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              {lastIpm ? "terakhir dicatat" : "belum ada IPM"}
            </p>
          </CardHeader>
        </Card>

        <Card className="@container/card flex-1 min-w-40">
          <CardHeader>
            <CardDescription>Perlu Kalibrasi</CardDescription>
            <CardTitle
              className={`@[250px]/card:text-3xl text-2xl font-semibold tabular-nums ${perluKalibrasi > 0 ? "text-destructive" : ""}`}
            >
              {perluKalibrasi}
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              alat melebihi 1 tahun kalibrasi
            </p>
          </CardHeader>
        </Card>

      </div>

      {/* Alat table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
          <CardTitle>Daftar Alat</CardTitle>
          <Suspense>
            <AlatSearchInput />
          </Suspense>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Merek</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>No. Seri</TableHead>
                <TableHead>Tahun</TableHead>
                <TableHead>Kalibrasi</TableHead>
                <TableHead>IPM Terakhir</TableHead>
                <TableHead>Status IPM</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlat.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    {search ? "Tidak ada alat yang cocok" : "Belum ada alat terdaftar"}
                  </TableCell>
                </TableRow>
              )}
              {filteredAlat.map((alat) => {
                const lastIpmEntry = alat.ipm[0] ?? null;
                const lastHasil = lastIpmEntry?.hasil ?? null;
                const lastIpmDate = lastIpmEntry?.createdAt ?? null;
                return (
                  <TableRow key={alat.id}>
                    <TableCell className="font-medium">{alat.nama}</TableCell>
                    <TableCell>{alat.merek ?? "—"}</TableCell>
                    <TableCell>{alat.tipe ?? "—"}</TableCell>
                    <TableCell>{alat.noSeri ?? "—"}</TableCell>
                    <TableCell>{alat.tahun ?? "—"}</TableCell>
                    <TableCell>
                      {alat.kalibrasi
                        ? alat.kalibrasi.toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        : "—"}
                    </TableCell>
                    <TableCell>
                      {lastIpmDate
                        ? lastIpmDate.toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        : <span className="text-muted-foreground text-xs">—</span>}
                    </TableCell>
                    <TableCell>
                      {lastHasil ? (
                        <Badge variant={lastHasil === "Alat Dapat Digunakan" ? "default" : "destructive"}>
                          {lastHasil}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-xs">Belum IPM</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Suspense>
            <AlatPagination page={page} totalPages={totalPages} />
          </Suspense>
        </CardContent>
      </Card>

    </div>
  );
}
