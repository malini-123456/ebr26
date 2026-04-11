import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type BetsInfo = {
  nomor_bets: string
  ukuran: number
  satuan: string
  expiredDate: Date
  produk: {
    nama_produk: string
    kode_produk: string
    hasil_produk: string
    foto_produk: string[]
  }
}

const fields = (b: BetsInfo) => [
  { label: "No Batch", value: b.nomor_bets },
  { label: "Nama Produk", value: b.produk.nama_produk },
  { label: "Kode Produk", value: b.produk.kode_produk },
  { label: "Ukuran Bets", value: `${b.ukuran} ${b.satuan}` },
  { label: "Deskripsi Produk", value: b.produk.hasil_produk || "-" },
  {
    label: "Expired Date",
    value: b.expiredDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  },
]

export function CardInfoProduk({ betsInfo }: { betsInfo: BetsInfo }) {
  return (
    <Card>
      <CardHeader className="bg-background">
        <CardTitle>Informasi Produk</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {betsInfo.produk.foto_produk.length > 0 && (
            <div className="relative w-32 h-32 rounded-md overflow-hidden border shrink-0">
              <Image src={betsInfo.produk.foto_produk[0]} alt="Foto produk" fill className="object-cover" />
            </div>
          )}
          <div className="space-y-2 text-sm">
            {fields(betsInfo).map((item) => (
              <div key={item.label} className="flex gap-2">
                <span className="font-medium w-40 shrink-0">{item.label}</span>
                <span>:</span>
                <span className="text-muted-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
