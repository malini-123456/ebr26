"use client";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

type Produk = {
  id: number;
  nama_produk: string;
  kode_produk: string;
};

export default function FormBets({ products }: { products: Produk[] }) {
  const [produkId, setProdukId] = useState("");

  return (
    <FieldGroup>
      <Field>
        <Label htmlFor="nomor_bets">Nomor Bets</Label>
        <Input
          id="1"
          name="nomor_bets"
          type="text"
          required />
      </Field>
      <Field>
        <Select onValueChange={setProdukId}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih Produk" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {products.map((p) => (
                <SelectItem key={p.id} value={String(p.id)}>
                  {p.nama_produk} ({p.kode_produk})
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <input
          type="hidden"
          name="produkId"
          value={produkId}
          required
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field>
          <Label>Ukuran</Label>
          <Input
            id="3"
            name="ukuran"
            type="number"
            required />
        </Field>
        <Field>
          <Label>Satuan</Label>
          <Input
            id="4"
            name="satuan"
            type="text"
            required />
        </Field>
      </div>
      <Field>
        <Label>Expired Date</Label>
        <Input
          id="5"
          name="expiredDate"
          type="date"
          required />
      </Field>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">Submit</Button>
      </DialogFooter>
    </FieldGroup>
  )
}
