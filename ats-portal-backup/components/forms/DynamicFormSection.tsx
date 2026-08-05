"use client";

import { DynamicInput } from "./DynamicInput";
import { buildFormFields } from "@/lib/forms/formBuilder";

interface DynamicFormSectionProps {
  role: string;
  update: (name: string, value: string) => void;
}

export function DynamicFormSection({ role, update }: DynamicFormSectionProps) {
  const fields = buildFormFields(role);

  return (
    <div className="flex flex-col gap-4">
      {fields.map((f) => (
        <DynamicInput
          key={f.name}
          name={f.name}
          label={f.label}
          type={f.type}
          onChange={update}
        />
      ))}
    </div>
  );
}
