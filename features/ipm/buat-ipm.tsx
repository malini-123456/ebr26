import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldSet,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TagsSelector } from "@/components/ui/tags-selector";
import { clerkClient } from "@clerk/nextjs/server";

export default async function BuatIPMForm() {

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
  ];

  const client = await clerkClient();
  const teknisi = (await client.users.getUserList(
  )).data;

  const teknisiList = teknisi.map((t) => ({
    id: t.id,
    name: t.fullName
  }))

  return (
    <FieldGroup>
      <FieldSet>
        <FieldGroup>
          {items.map((ipm) => (
            <Field key={ipm.id} className="flex flex-row w-full items-center">
              <FieldLabel htmlFor={ipm.name} className="basis-1/3">{ipm.label}</FieldLabel>
              <Input
                id={ipm.name}
                name={ipm.name}
                type={ipm.type}
                required={ipm.required}
                className="basis-2/3 rounded-xl"
              />
            </Field>
          ))}
        </FieldGroup>
      </FieldSet>
      <TagsSelector tags={teknisiList} />
      <Button type="submit" className="mt-4 py-2">Submit</Button>
    </FieldGroup>
  )
}