import CosmicSectorPortal from "@/components/cosmic/CosmicSectorPortal";
import CosmicCrest from "@/components/cosmic/CosmicCrest";
import CosmicUniverseMap from "@/components/cosmic/CosmicUniverseMap";
import CosmicOmniverse from "@/components/cosmic/CosmicOmniverse";
import CosmicSingularity from "@/components/cosmic/CosmicSingularity";
import CosmicCelestialContinuum from "@/components/cosmic/CosmicCelestialContinuum";
import CosmicEternalContinuum from "@/components/cosmic/CosmicEternalContinuum";
import CosmicDivineContinuum from "@/components/cosmic/CosmicDivineContinuum";

export default function PortalPage() {
  return (
    <div className="p-6 space-y-12">

      {/* --- Sector Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <CosmicSectorPortal name="Intelligence" href="/portal/intelligence/dashboard" />
        <CosmicSectorPortal name="Certificates" href="/portal/certificates" />
        <CosmicSectorPortal name="Payments" href="/portal/payments" />
        <CosmicSectorPortal name="Savings" href="/portal/savings" />
        <CosmicSectorPortal name="Stakeholders" href="/portal/stakeholders" />
        <CosmicSectorPortal name="Communities" href="/portal/communities" />
        <CosmicSectorPortal name="Institutions" href="/portal/institutions" />
        <CosmicSectorPortal name="Staff" href="/portal/staff" />
      </div>

      {/* --- Cosmic Visual Layer --- */}
      <div className="space-y-10">
        <CosmicCrest />
        <CosmicUniverseMap />
        <CosmicOmniverse />
        <CosmicSingularity />
        <CosmicCelestialContinuum />
        <CosmicEternalContinuum />
        <CosmicDivineContinuum />
      </div>

    </div>
  );
}
