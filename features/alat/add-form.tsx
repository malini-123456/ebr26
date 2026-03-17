"use client";

import ActionButton from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import {
  FieldGroup,
  FieldSet,
  FieldLabel,
  Field
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alat } from "@/lib/definitions/tipe-alat";
import { useState } from "react";
import SubmitButton from "../ipm/components/loading-submit-button";

type Ruangan = {
  id: number;
  namaRuangan: string;
};

interface CreateAlatProps {
  ruanganList: Ruangan[];
  initialData?: Alat;
}

export default function CreateAlat({ ruanganList, initialData }: CreateAlatProps) {

  const [isPending, setIsPending] = useState(false);

  function handleClick() {
    setIsPending(true);
    setTimeout(() => setIsPending(false), 1500);
  }

  const isEdit = !!initialData;

  const [ruanganId, setRuanganId] = useState<string>(
    initialData?.ruanganId?.toString() ?? ""
  );

  const items = [
    { id: 1, label: "Nama Alat", name: "nama", type: "text", required: true },
    { id: 2, label: "Merek", name: "merek", type: "text" },
    { id: 3, label: "Tipe", name: "tipe", type: "text" },
    { id: 4, label: "No. Seri", name: "noSeri", type: "text" },
    { id: 6, label: "Tahun", name: "tahun", type: "number" },
    { id: 7, label: "Tgl. Kalibrasi", name: "kalibrasi", type: "date" },
    { id: 8, label: "Keterangan", name: "keterangan", type: "text" }
  ];

  return (
    <FieldGroup>
      <FieldSet>
        <FieldGroup>
          {items.map((item) => {
            let defaultVal = initialData?.[item.name as keyof Alat] ?? "";

            if (item.type === "date" && defaultVal) {
              defaultVal = new Date(defaultVal as string)
                .toISOString()
                .split("T")[0];
            }

            return (
              <Field key={item.id} className="flex flex-row w-full items-center">
                <FieldLabel htmlFor={item.name} className="basis-1/3">
                  {item.label}
                </FieldLabel>
                <Input
                  id={item.name}
                  name={item.name}
                  type={item.type}
                  defaultValue={defaultVal as string}
                  required={item.required}
                  className="basis-2/3 rounded-xl"
                />
              </Field>
            );
          })}

          {/* Ruangan Select */}
          <Field className="flex flex-row w-full items-center">
            <FieldLabel className="basis-1/3">
              Ruangan
            </FieldLabel>

            <div className="basis-2/3">
              <Select
                defaultValue={initialData?.ruanganId?.toString() ?? ""}
                onValueChange={(value) => setRuanganId(value)}
              >
                <SelectTrigger className="rounded-xl w-full">
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
      <SubmitButton />
    </FieldGroup>
  );
}