export default function RoleOnboardPage({ params }: { params: { role: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Onboarding: {params.role.toUpperCase()}
      </h1>

      <p className="text-gray-600 mb-4">
        Load the dynamic form for <strong>{params.role}</strong> here.
      </p>
    </div>
  );
}
