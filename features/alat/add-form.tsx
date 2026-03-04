"use client";

import { Button } from "@/components/ui/button";
import {
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldLabel,
  FieldDescription,
  Field
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type Ruangan = {
  id: number;
  namaRuangan: string;
};

interface CreateAlatProps {
  ruanganList: Ruangan[];
}

const items = [
  {
    id: 1,
    label: "Nama Alat",
    name: "nama",
    type: "text",
    placeholder: "Nama Alat",
    required: true,
  },
  {
    id: 2,
    label: "Merek",
    name: "merek",
    type: "text",
    placeholder: "Merek",
  },
  {
    id: 3,
    label: "Tipe",
    name: "tipe",
    type: "text",
    placeholder: "Tipe",
  },
  {
    id: 4,
    label: "No. Seri",
    type: "text",
    name: "noSeri",
    placeholder: "No. Seri",
  },
  {
    id: 6,
    label: "Tahun",
    type: "number",
    name: "tahun",
    placeholder: "Tahun",
  },
  {
    id: 7,
    label: "Tgl. Kalibrasi",
    type: "date",
    name: "kalibrasi",
    placeholder: "Tgl. Kalibrasi",
  },
  {
    id: 8,
    label: "Keterangan",
    type: "text",
    name: "keterangan",
    placeholder: "Keterangan",
  }

]
export default function CreateAlat({ ruanganList }: CreateAlatProps) {

  const [ruanganId, setRuanganId] = useState<string>("");

  return (
    <FieldGroup>
      <FieldSet>
        <FieldGroup>
          {items.map((item) => (
            <Field key={item.id} className="flex flex-row w-full items-center">
              <FieldLabel htmlFor={item.name} className="basis-1/3">{item.label}</FieldLabel>
              <Input
                id={item.name}
                name={item.name}
                type={item.type}
                placeholder={item.placeholder}
                required={item.required}
                className="basis-2/3 rounded-xl"
              />
            </Field>
          ))}
          <Field className="flex flex-row w-full items-center">
            <FieldLabel className="basis-1/3">
              Ruangan
            </FieldLabel>

            <div className="basis-2/3">
              <Select
                value={ruanganId}
                onValueChange={(value) => setRuanganId(value)}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Pilih Ruangan" />
                </SelectTrigger>
                <SelectContent>
                  {ruanganList.map((r) => (
                    <SelectItem key={r.id} value={String(r.id)}>
                      {r.namaRuangan}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Hidden input so formData can read it */}
              <input
                type="hidden"
                name="ruanganId"
                value={ruanganId}
                required
              />
            </div>
          </Field>
        </FieldGroup>
      </FieldSet>
      <Button type="submit" className="mt-4 py-2">Submit</Button>
    </FieldGroup>
  )
}
