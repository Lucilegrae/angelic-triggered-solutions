import CosmicHeader from "@/components/cosmic/CosmicHeader";
import CosmicPage from "@/components/cosmic/CosmicPage";

export default function StaffPage() {
  return (
    <CosmicPage className="cosmic-staff">
      <CosmicHeader title="Staff" className="cosmic-staff" />
      <div className="text-slate-300">
        {/* Staff module content */}
      </div>
    </CosmicPage>
  );
}
