import { Card, CardHeader } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { ClipboardList, FlaskConical, Layers, Package } from "lucide-react";

export async function SectionCards() {
  const [hitungProduk, hitungBahan, hitungInstruksi, hitungBets] = await Promise.all([
    prisma.produk.count(),
    prisma.bahan.count(),
    prisma.instruksi.count(),
    prisma.bets.count(),
  ]);

  const stats = [
    {
      title: "Total Produk",
      value: hitungProduk,
      description: "Formula terdaftar",
      icon: Package,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500/10",
    },
    {
      title: "Total Bahan",
      value: hitungBahan,
      description: "Bahan baku tercatat",
      icon: FlaskConical,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-500/10",
    },
    {
      title: "Total Instruksi",
      value: hitungInstruksi,
      description: "Langkah pembuatan",
      icon: ClipboardList,
      iconColor: "text-violet-500",
      iconBg: "bg-violet-500/10",
    },
    {
      title: "Total Bets",
      value: hitungBets,
      description: "Batch record terdaftar",
      icon: Layers,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="@container/card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="@[250px]/card:text-4xl text-3xl font-bold tabular-nums">
                    {stat.value.toLocaleString("id-ID")}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
                <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
                  <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </div>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
