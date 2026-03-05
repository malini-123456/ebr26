import {
  Field,
  FieldGroup,
  FieldSet,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Alat } from "@/lib/definitions/tipe-alat";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateIpmProps {
  alatList: Alat[]
}
const items = [
  {
    id: 1,
    label: "Setting Alat",
    name: "settingAlat",
    type: "text",
    placeholder: "Setting",
  },
  {
    id: 2,
    label: "Terukur",
    name: "terukur",
    type: "text",
    placeholder: "Terukur",
  },
  {
    id: 3,
    label: "Hasil",
    name: "hasil",
    type: "text",
    placeholder: "Hasil",
    required: true,
  },
  {
    id: 4,
    label: "Pilih Alat",
    name: "inventaris",
    type: "text",
    placeholder: "Hasil",
    required: true,
  },

]

export default function CreateIpm({ alatList }: CreateIpmProps) {

  const [alatId, setAlatId] = useState<string>("");

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
              Alat
            </FieldLabel>

            <div className="basis-2/3">
              <Select
                value={alatId}
                onValueChange={(value) => setAlatId(value)}
              >
                <SelectTrigger className="rounded-xl w-full">
                  <SelectValue placeholder="Pilih Ruangan" />
                </SelectTrigger>
                <SelectContent>
                  {alatList.map((r) => (
                    <SelectItem key={r.id} value={String(r.id)}>
                      {r.noSeri}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Hidden input so formData can read it */}
              <input
                type="hidden"
                name="ruanganId"
                value={alatId}
                required
              />
            </div>
          </Field>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  )
}