"use client";

type EnrolFormProps = {
  role: string;
};

export function EnrolForm({ role }: EnrolFormProps) {
  return (
    <form className="space-y-4">
      <h2 className="text-xl font-semibold">{role} Enrolment</h2>

      <input
        type="text"
        placeholder="Organization name"
        className="w-full rounded border p-2"
      />

      <button
        type="submit"
        className="rounded bg-emerald-600 px-4 py-2 text-white"
      >
        Submit
      </button>
    </form>
  );
}
