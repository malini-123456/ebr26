"use client";
import { useState } from "react";
import { MultiImagesDropzone } from "@/components/image-multiple-dropzone";
import SubmitButton from "@/components/loading-submitbutton";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CreateProduk } from "@/app/action/action";

type InitialData = {
  nama_produk?: string;
  kode_produk?: string;
  hasil_produk?: string;
  satuan_produk?: string;
  bentuk_produk?: string | null;
  warna_produk?: string | null;
  aroma_produk?: string | null;
  ph_produk?: string | null;
  homogenitas?: string | null;
  foto_produk?: string[];
};

export default function FormProduk({
  initialData,
  action,
}: {
  initialData?: InitialData;
  action?: (formData: FormData) => Promise<void>;
}) {
  const [fotoUrls, setFotoUrls] = useState<string[]>(initialData?.foto_produk ?? []);

  const fields = [
    { id: 1, label: "Nama Produk", name: "nama_produk", type: "text", required: true, defaultValue: initialData?.nama_produk },
    { id: 2, label: "Kode Produk", name: "kode_produk", type: "text", required: true, defaultValue: initialData?.kode_produk },
    { id: 3, label: "Hasil Produk", name: "hasil_produk", type: "text", required: true, defaultValue: initialData?.hasil_produk },
    { id: 4, label: "Satuan", name: "satuan_produk", type: "text", defaultValue: initialData?.satuan_produk },
    { id: 5, label: "Bentuk", name: "bentuk_produk", type: "text", defaultValue: initialData?.bentuk_produk ?? "" },
    { id: 6, label: "Warna", name: "warna_produk", type: "text", defaultValue: initialData?.warna_produk ?? "" },
    { id: 7, label: "Aroma", name: "aroma_produk", type: "text", defaultValue: initialData?.aroma_produk ?? "" },
    { id: 8, label: "pH", name: "ph_produk", type: "text", defaultValue: initialData?.ph_produk ?? "" },
    { id: 9, label: "Homogenitas", name: "homogenitas", type: "text", defaultValue: initialData?.homogenitas ?? "" },
  ];

  async function handleSubmit(formData: FormData) {
    fotoUrls.forEach((url) => formData.append("foto_produk", url));
    await (action ?? CreateProduk)(formData);
  }

  return (
    <form action={handleSubmit}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            {fields.map((i) => (
              <Field key={i.id} className="flex flex-row w-full items-center">
                <FieldLabel htmlFor={i.name} className="basis-1/3">{i.label}</FieldLabel>
                <Input
                  id={i.name}
                  name={i.name}
                  type={i.type}
                  required={i.required}
                  placeholder={i.label}
                  defaultValue={i.defaultValue}
                  className="basis-2/3"
                />
              </Field>
            ))}
            <Field className="flex flex-row w-full items-center">
              <FieldLabel className="basis-1/3">Foto Produk</FieldLabel>
              <MultiImagesDropzone onUrlsChange={setFotoUrls} />
            </Field>
          </FieldGroup>
        </FieldSet>
        <SubmitButton />
      </FieldGroup>
    </form>
  );
}
