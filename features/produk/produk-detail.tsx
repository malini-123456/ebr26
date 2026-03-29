"use client";

import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { PackageIcon, PlusIcon, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { deleteBahan, deleteInstruksi } from "@/app/action/action";
import { useTransition } from "react";

type Bahan = {
  id: number;
  nama_bahan: string;
  jumlah_bahan: number;
  satuan_bahan: string;
};

type Instruksi = {
  id: number;
  langkah: string;
};

type ProdukDetailProps = {
  produk: {
    id: number;
    nama_produk: string;
    kode_produk: string;
    hasil_produk: string;
    satuan_produk: string;
    bentuk_produk: string | null;
    warna_produk: string | null;
    aroma_produk: string | null;
    ph_produk: string | null;
    homogenitas: string | null;
    foto_produk: string[];
    bahan: Bahan[];
    instruksi: Instruksi[];
  };
};

function DeleteBahanButton({ id, produkId }: { id: number; produkId: number }) {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-destructive hover:text-destructive h-7 w-7"
      disabled={pending}
      onClick={() => startTransition(() => deleteBahan(id, produkId))}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}

function DeleteInstruksiButton({ id, produkId }: { id: number; produkId: number }) {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-destructive hover:text-destructive h-7 w-7"
      disabled={pending}
      onClick={() => startTransition(() => deleteInstruksi(id, produkId))}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}

export function ProdukDetail({ produk }: ProdukDetailProps) {
  const mainImage = produk.foto_produk[0] ?? null;
  const baseUrl = `/produk/${produk.id}`;

  return (
    <div className="flex flex-col gap-6">
      {/* Hero Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <div className="relative h-48 w-48 overflow-hidden rounded-lg border bg-muted">
                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt={produk.nama_produk}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <PackageIcon className="h-16 w-16" />
                  </div>
                )}
              </div>
              {produk.foto_produk.length > 1 && (
                <div className="mt-2 flex gap-2">
                  {produk.foto_produk.slice(0, 4).map((src, i) => (
                    <div
                      key={i}
                      className="relative h-12 w-12 overflow-hidden rounded border bg-muted"
                    >
                      <Image
                        src={src}
                        alt={`${produk.nama_produk} ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center gap-2">
              <h2 className="text-2xl font-bold">{produk.nama_produk}</h2>
              <p className="text-muted-foreground text-sm font-medium">
                {produk.kode_produk} &nbsp;|&nbsp; {produk.hasil_produk}{" "}
                {produk.satuan_produk}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="spesifikasi">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="spesifikasi">Spesifikasi</TabsTrigger>
          <TabsTrigger value="bahan">Bahan</TabsTrigger>
          <TabsTrigger value="instruksi">Tahap Pengolahan</TabsTrigger>
        </TabsList>

        {/* Tab 1: Spesifikasi */}
        <TabsContent value="spesifikasi">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="w-40 font-medium">Bentuk</TableCell>
                    <TableCell>{produk.bentuk_produk ?? "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Warna</TableCell>
                    <TableCell>{produk.warna_produk ?? "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Aroma</TableCell>
                    <TableCell>{produk.aroma_produk ?? "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">pH</TableCell>
                    <TableCell>{produk.ph_produk ?? "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Homogenitas</TableCell>
                    <TableCell>{produk.homogenitas ?? "-"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Bahan */}
        <TabsContent value="bahan">
          <div className="mb-3 flex justify-end">
            <Link
              href={`${baseUrl}/bahan/create`}
              className={cn(buttonVariants({ size: "sm" }), "gap-1")}
            >
              <PlusIcon className="h-4 w-4" />
              Tambah Bahan
            </Link>
          </div>
          <Card>
            <CardContent className="p-0">
              {produk.bahan.length === 0 ? (
                <p className="text-muted-foreground p-6 text-center text-sm">
                  Belum ada bahan.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">No</TableHead>
                      <TableHead>Nama Bahan</TableHead>
                      <TableHead className="text-right">Jumlah</TableHead>
                      <TableHead className="w-20" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {produk.bahan.map((b, i) => (
                      <TableRow key={b.id}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{b.nama_bahan}</TableCell>
                        <TableCell className="text-right">
                          {b.jumlah_bahan} {b.satuan_bahan}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`${baseUrl}/bahan/${b.id}/edit`}
                              className={cn(
                                buttonVariants({ variant: "ghost", size: "icon" }),
                                "h-7 w-7"
                              )}
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                            <DeleteBahanButton id={b.id} produkId={produk.id} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Instruksi / Tahap Pengolahan */}
        <TabsContent value="instruksi">
          <div className="mb-3 flex justify-end">
            <Link
              href={`${baseUrl}/instruksi/create`}
              className={cn(buttonVariants({ size: "sm" }), "gap-1")}
            >
              <PlusIcon className="h-4 w-4" />
              Tambah Instruksi
            </Link>
          </div>
          <Card>
            <CardContent className="p-0">
              {produk.instruksi.length === 0 ? (
                <p className="text-muted-foreground p-6 text-center text-sm">
                  Belum ada instruksi.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">No</TableHead>
                      <TableHead>Instruksi</TableHead>
                      <TableHead className="w-20" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {produk.instruksi.map((ins, i) => (
                      <TableRow key={ins.id}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{ins.langkah}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`${baseUrl}/instruksi/${ins.id}/edit`}
                              className={cn(
                                buttonVariants({ variant: "ghost", size: "icon" }),
                                "h-7 w-7"
                              )}
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                            <DeleteInstruksiButton id={ins.id} produkId={produk.id} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
