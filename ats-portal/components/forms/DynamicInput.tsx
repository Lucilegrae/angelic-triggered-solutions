"use client";

interface DynamicInputProps {
  name: string;
  label: string;
  type: string;
  onChange: (name: string, value: string) => void;
}

export function DynamicInput({ name, label, type, onChange }: DynamicInputProps) {
  return (
    <input
      className="input"
      type={type}
      placeholder={label}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );
}
