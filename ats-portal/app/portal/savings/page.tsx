import CosmicHeader from "@/components/cosmic/CosmicHeader";
import CosmicPage from "@/components/cosmic/CosmicPage";

export default function SavingsPage() {
  return (
    <CosmicPage className="cosmic-savings">
      <CosmicHeader title="Savings" className="cosmic-savings" />
      <div className="text-slate-300">
        {/* Savings module content */}
      </div>
    </CosmicPage>
  );
}
