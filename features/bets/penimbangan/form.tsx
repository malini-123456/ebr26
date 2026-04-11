"use client"

import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import SubmitButton from "@/components/loading-submitbutton"

type BahanRow = {
  id: number
  nama_bahan: string
  jumlah_bahan: number
  satuan_bahan: string
}

type ExistingItem = {
  bahanId: number
  jmlDitimbang: number
  satuan: string
  noBatchBahan: string | null
  ditimbangOleh: string | null
  diawasiOleh: string | null
}

export default function PenimbanganForm({
  bahan,
  action,
  existingItems = [],
}: {
  bahan: BahanRow[]
  action: (formData: FormData) => Promise<void>
  existingItems?: ExistingItem[]
}) {
  const existingMap = Object.fromEntries(existingItems.map((item) => [item.bahanId, item]))

  return (
    <form action={action} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Penimbangan Bahan</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="w-full text-sm">
              <TableHeader>
                <tr className="border-b bg-muted/50">
                  <TableHead className="px-4 py-3 w-10">No</TableHead>
                  <TableHead className="px-4 py-3">Nama Bahan</TableHead>
                  <TableHead className="px-4 py-3 w-36">Jml Dibutuhkan</TableHead>
                  <TableHead className="px-4 py-3 w-32">Jml Ditimbang</TableHead>
                  <TableHead className="px-4 py-3 w-28">Satuan</TableHead>
                  <TableHead className="px-4 py-3 w-36">No Batch Bahan</TableHead>
                  <TableHead className="px-4 py-3 w-36">Ditimbang Oleh</TableHead>
                  <TableHead className="px-4 py-3 w-36">Diawasi Oleh</TableHead>
                </tr>
              </TableHeader>
              <TableBody>
                {bahan.map((b, index) => {
                  const saved = existingMap[b.id]
                  return (
                    <TableRow key={b.id} className="border-b last:border-0 hover:bg-muted/30">
                      <TableCell className="px-4 py-3 text-muted-foreground">{index + 1}</TableCell>
                      <TableCell className="px-4 py-3 font-medium">{b.nama_bahan}</TableCell>
                      <TableCell className="px-4 py-3 text-muted-foreground">
                        {b.jumlah_bahan} {b.satuan_bahan}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <Input
                          type="number"
                          step="any"
                          name={`jml_ditimbang_${b.id}`}
                          className="h-8 text-sm"
                          defaultValue={saved?.jmlDitimbang ?? ""}
                          required
                        />
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <Input
                          name={`satuan_${b.id}`}
                          className="h-8 text-sm"
                          defaultValue={saved?.satuan ?? b.satuan_bahan}
                          required
                        />
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <Input
                          name={`no_batch_bahan_${b.id}`}
                          className="h-8 text-sm"
                          defaultValue={saved?.noBatchBahan ?? ""}
                        />
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <Input
                          name={`ditimbang_oleh_${b.id}`}
                          className="h-8 text-sm"
                          placeholder="Nama"
                          defaultValue={saved?.ditimbangOleh ?? ""}
                        />
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <Input
                          name={`diawasi_oleh_${b.id}`}
                          className="h-8 text-sm"
                          placeholder="Nama"
                          defaultValue={saved?.diawasiOleh ?? ""}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Catatan</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            name="catatan_penimbangan"
            rows={3}
            placeholder="Catatan tambahan..."
            className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </CardContent>
      </Card>

      <SubmitButton />
    </form>
  )
}
