import AuraSkeleton from "./AuraSkeleton";

export default function MinistrySectionSkeleton({
  title,
  count = 3,
}: {
  title: string;
  count?: number;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-slate-500">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: count }).map((_, idx) => (
          <AuraSkeleton key={idx} />
        ))}
      </div>
    </section>
  );
}
