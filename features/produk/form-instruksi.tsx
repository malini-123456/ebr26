"use client";

import SubmitButton from "@/components/loading-submitbutton";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { createInstruksi } from "@/app/action/action";

type InitialData = {
  langkah?: string;
};

export default function FormInstruksi({
  produkId,
  initialData,
  action,
}: {
  produkId: number;
  initialData?: InitialData;
  action?: (formData: FormData) => Promise<void>;
}) {
  const handleSubmit = action ?? createInstruksi.bind(null, produkId);

  return (
    <form action={handleSubmit}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field className="flex flex-row w-full items-start">
              <FieldLabel htmlFor="langkah" className="basis-1/3 pt-2">
                Instruksi
              </FieldLabel>
              <textarea
                id="langkah"
                name="langkah"
                required
                placeholder="Tulis langkah instruksi..."
                defaultValue={initialData?.langkah}
                rows={4}
                className="basis-2/3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <SubmitButton />
      </FieldGroup>
    </form>
  );
}
