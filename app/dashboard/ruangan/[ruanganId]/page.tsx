import PageContainer from "@/components/layout/page-container"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { AlatdiRuangan } from "@/features/ruangan/datatable_detailalat";

export default async function DetailRuangan({ params,
}: {
  params: Promise<{ ruanganId: string }>
}) {
  const { ruanganId } = await params;
  const id = Number(ruanganId);

  const values = await prisma.ruangan.findUnique({
    where: { id },
    include: {
      alat: {
        include: {
          ruangan: true,
        },
      },
      ipm: {
        include: {
          alat: {
            include: {
              ruangan: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  const ruangan = await prisma.ruangan.findUnique({
    where: { id },
    include: {
      alat: { include: { ruangan: true, ipm: { orderBy: { createdAt: "desc" }, take: 1 } } },
      ipm: { orderBy: { createdAt: "desc" } },
    },
  });
  const totalAlat = values?.alat.length ?? 0;
  const totalIpm = values?.ipm.length ?? 0;
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
  return (
    <PageContainer pageTitle={`Detail Ruangan - ${values?.namaRuangan ?? ""}`}>
      <div className="
    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rounded-xl gap-3 py-4">

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
      <AlatdiRuangan
        data={ruangan?.alat ?? []}
        totalItems={totalAlat}
        ruanganId={id} />
    </PageContainer>
  )
}
