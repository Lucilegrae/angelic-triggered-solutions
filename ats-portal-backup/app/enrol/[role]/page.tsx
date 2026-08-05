import { notFound } from 'next/navigation';
import { EnrolForm } from '@/components/EnrolForm';

const allowedRoles = [
  'community',
  'miner',
  'bank',
  'investor',
  'government',
  'suppliers',
  'transport',
  'donors',
];

export default function EnrolRolePage({ params }: { params: { role: string } }) {
  const { role } = params;

  if (!allowedRoles.includes(role)) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col items-center py-10">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold capitalize">
          {role} Stakeholder Enrolment
        </h1>

        <p className="mt-2 text-xs text-slate-400">
          Fill in the covenantal details for your branch of the sunflower continuum.
        </p>

        <div className="mt-6">
          <EnrolForm role={role as any} />
        </div>
      </div>
    </main>
  );
}
