"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SubmitButton from "@/components/loading-submitbutton"
import { IconPdf } from "@tabler/icons-react"
import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table"

type BetsInfo = {
  nomor_bets: string
  produk: {
    nama_produk: string
    kode_produk: string
    hasil_produk: string
  }
  ukuran: number
  satuan: string
}

type ExistingItem = {
  result: boolean
  petugas: string | null
  pengawas: string | null
  template: { label: string }
}

const checklistItems = [
  { key: "ruangandibersihkan", label: "Ruangan Telah Dibersihkan" },
  { key: "statuskebersihan", label: "Tersedia Status Kebersihan Ruangan" },
  { key: "alatproduksi", label: "Alat Produksi Lengkap" },
  { key: "alatdibersihkan", label: "Alat Telah Dibersihkan & Disanitasi" },
  { key: "alatbekerja", label: "Alat Dapat Bekerja Dengan Baik" },
  { key: "bahancukup", label: "Tersedia Bahan dlm Jumlah Cukup & Lengkap" },
  { key: "bahanlengkap", label: "Bahan Lengkap" },
  { key: "bahanjumlah", label: "Jumlah Bahan Mencukupi" },
  { key: "batchrecord", label: "Tersedia Batch Record" },
]

export default function FormProses1({
  betsInfo,
  action,
  existingItems = [],
}: {
  betsInfo: BetsInfo
  action: (formData: FormData) => Promise<void>
  existingItems?: ExistingItem[]
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const lastPos = useRef<{ x: number; y: number } | null>(null)

  const existingMap = Object.fromEntries(
    existingItems.map((item) => [item.template.label, item])
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
  }, [])

  function getPos(
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      }
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  function startDraw(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return
    setIsDrawing(true)
    lastPos.current = getPos(e, canvas)
  }

  function draw(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    e.preventDefault()
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas || !lastPos.current) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const pos = getPos(e, canvas)
    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    lastPos.current = pos
  }

  function endDraw() {
    setIsDrawing(false)
    lastPos.current = null
  }

  function clearSignature() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  async function exportPdf() {
    const { default: jsPDF } = await import('jspdf')
    const { default: autoTable } = await import('jspdf-autotable')
    type DocWithTable = InstanceType<typeof jsPDF> & { lastAutoTable: { finalY: number } }
    const doc = new jsPDF() as DocWithTable
    const form = formRef.current

    doc.setFontSize(14)
    doc.text('DAFTAR PERIKSA PERSIAPAN PRODUKSI', 105, 15, { align: 'center' })

    autoTable(doc, {
      startY: 22,
      body: [
        ['No Batch', betsInfo.nomor_bets],
        ['Nama Produk', betsInfo.produk.nama_produk],
        ['Kode Produk', betsInfo.produk.kode_produk],
        ['Ukuran Bets', `${betsInfo.ukuran} ${betsInfo.satuan}`],
        ['Deskripsi Produk', betsInfo.produk.hasil_produk || '-'],
      ],
      theme: 'plain',
      styles: { fontSize: 9 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 45 }, 1: { cellWidth: 120 } },
    })

    const checklistBody = checklistItems.map((item, i) => {
      const checked = form
        ? (form.elements.namedItem(`pemeriksaan_${item.key}`) as HTMLInputElement)?.checked
        : (existingMap[item.key]?.result ?? false)
      const petugas = form
        ? (form.elements.namedItem(`petugas_${item.key}`) as HTMLInputElement)?.value ?? ''
        : (existingMap[item.key]?.petugas ?? '')
      const pengawas = form
        ? (form.elements.namedItem(`pengawas_${item.key}`) as HTMLInputElement)?.value ?? ''
        : (existingMap[item.key]?.pengawas ?? '')
      return [i + 1, item.label, checked ? 'Ya' : '-', petugas, pengawas]
    })

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 6,
      head: [['No', 'Item Pemeriksaan', 'Hasil (Ya)', 'Petugas', 'Pengawas']],
      body: checklistBody,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [60, 60, 60] },
    })

    const afterChecklist = doc.lastAutoTable.finalY + 6
    const catatan = form
      ? (form.elements.namedItem('catatan_proses1') as HTMLTextAreaElement)?.value ?? ''
      : ''
    doc.setFont('helvetica', 'bold')
    doc.text('Catatan:', 14, afterChecklist)
    doc.setFont('helvetica', 'normal')
    doc.text(catatan || '-', 14, afterChecklist + 6, { maxWidth: 180 })

    const afterNotes = afterChecklist + 14
    const decided = form
      ? (form.elements.namedItem('keputusanmanager_proses1') as HTMLInputElement)?.checked
      : false
    doc.setFont('helvetica', 'bold')
    doc.text('Keputusan Manajer Produksi:', 14, afterNotes)
    doc.setFont('helvetica', 'normal')
    doc.text(decided ? 'Produksi Dilanjutkan' : '-', 14, afterNotes + 6)

    const canvas = canvasRef.current
    if (canvas) {
      const afterDecision = afterNotes + 16
      doc.setFont('helvetica', 'bold')
      doc.text('Tanda Tangan Manajer Produksi:', 14, afterDecision)
      doc.addImage(canvas.toDataURL('image/png'), 'PNG', 14, afterDecision + 4, 80, 20)
    }

    doc.save(`proses1_${betsInfo.nomor_bets}.pdf`)
  }

  async function handleSubmit(formData: FormData) {
    const canvas = canvasRef.current
    if (canvas) {
      formData.append("ttd_signature", canvas.toDataURL("image/png"))
    }
    await action(formData)
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-6">
      {/* Checklist Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Periksa Persiapan</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="w-full text-sm">
              <TableHeader>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium w-10">No</th>
                  <th className="text-left px-4 py-3 font-medium">Item Pemeriksaan</th>
                  <th className="text-center px-4 py-3 font-medium w-24">Hasil (Ya)</th>
                  <th className="text-left px-4 py-3 font-medium w-40">Petugas</th>
                  <th className="text-left px-4 py-3 font-medium w-40">Pengawas</th>
                </tr>
              </TableHeader>
              <TableBody>
                {checklistItems.map((item, index) => {
                  const saved = existingMap[item.key]
                  return (
                    <TableRow key={item.key} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3 text-muted-foreground">{index + 1}</td>
                      <td className="px-4 py-3">{item.label}</td>
                      <td className="px-4 py-3 text-center">
                        <Checkbox
                          name={`pemeriksaan_${item.key}`}
                          value="ya"
                          defaultChecked={saved?.result ?? false}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          name={`petugas_${item.key}`}
                          placeholder="Nama petugas"
                          className="h-8 text-sm"
                          defaultValue={saved?.petugas ?? ''}
                          required
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          name={`pengawas_${item.key}`}
                          placeholder="Nama pengawas"
                          className="h-8 text-sm"
                          defaultValue={saved?.pengawas ?? ''}
                          required
                        />
                      </td>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Catatan</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            name="catatan_proses1"
            rows={3}
            placeholder="Catatan tambahan..."
            className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </CardContent>
      </Card>

      {/* Signature Pad */}
      <Card>
        <CardHeader>
          <CardTitle>Tanda Tangan Manajer Produksi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <canvas
            ref={canvasRef}
            width={800}
            height={200}
            className="w-full border border-input rounded-lg cursor-crosshair bg-white touch-none"
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={endDraw}
          />
          <Button type="button" variant="outline" size="sm" onClick={clearSignature}>
            Hapus Tanda Tangan
          </Button>
        </CardContent>
      </Card>

      {/* Decision */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Checkbox name="keputusanmanager_proses1" id="keputusan" value="dilanjutkan" />
            <Label htmlFor="keputusan" className="text-sm font-medium cursor-pointer">
              Keputusan Manajer Produksi: <span className="text-primary">Produksi Dilanjutkan</span>
            </Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <SubmitButton />
        <Button type="button" variant="outline" onClick={exportPdf}>
          <IconPdf className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </div>
    </form>
  )
}
