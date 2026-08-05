"use client";

import CosmicHeader from "@/components/cosmic/CosmicHeader";
import CosmicPage from "@/components/cosmic/CosmicPage";

/* Charts */
import CosmicChart from "@/components/cosmic/CosmicChart";

/* GNSS Cosmic Components */
import CosmicGNSSConstellation from "@/components/cosmic/CosmicGNSSConstellation";
import CosmicGNSSStarfield from "@/components/cosmic/CosmicGNSSStarfield";
import CosmicGNSSOrbital from "@/components/cosmic/CosmicGNSSOrbital";
import CosmicGNSSOrbitalV2 from "@/components/cosmic/CosmicGNSSOrbitalV2";
import CosmicGNSSAstral from "@/components/cosmic/CosmicGNSSAstral";

/* Analytics Layer */
import CosmicHeatmap from "@/components/cosmic/CosmicHeatmap";
import CosmicFederationMap from "@/components/cosmic/CosmicFederationMap";
import CosmicWorkflowVisualizer from "@/components/cosmic/CosmicWorkflowVisualizer";
import CosmicConstellationEngine from "@/components/cosmic/CosmicConstellationEngine";
import CosmicOrbitSimulation from "@/components/cosmic/CosmicOrbitSimulation";
import CosmicWormhole from "@/components/cosmic/CosmicWormhole";

/* Ministry Layer */
import CosmicMinistrySpirit from "@/components/cosmic/CosmicMinistrySpirit";
import CosmicMinistryThrone from "@/components/cosmic/CosmicMinistryThrone";
import CosmicMinistryThroneAscended from "@/components/cosmic/CosmicMinistryThroneAscended";
import CosmicMinistryThroneEternal from "@/components/cosmic/CosmicMinistryThroneEternal";

/* Divine Layer */
import CosmicDivineBeing from "@/components/cosmic/CosmicDivineBeing";
import CosmicAstralDivination from "@/components/cosmic/CosmicAstralDivination";

export default function IntelligenceDashboard() {
  return (
    <CosmicPage className="cosmic-intelligence">
      <CosmicHeader title="Intelligence Dashboard" className="cosmic-intelligence" />

      {/* Charts */}
      <CosmicChart
        title="Ministry Alignment Score"
        labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
        data={[72, 75, 78, 82, 85, 91]}
      />

      <div className="mt-8" />

      <CosmicChart
        title="Compliance Trajectory"
        labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
        data={[60, 63, 67, 70, 74, 80]}
      />

      {/* Cosmic Intelligence Layer */}
      <div className="space-y-10 mt-12">

        <CosmicGNSSConstellation />
        <CosmicHeatmap values={[91, 80, 76, 68, 84]} />
        <CosmicFederationMap />
        <CosmicWorkflowVisualizer />
        <CosmicConstellationEngine />

        <CosmicGNSSStarfield
          points={[
            { x: 80, y: 120 },
            { x: 200, y: 200 },
            { x: 300, y: 140 },
            { x: 150, y: 300 },
          ]}
        />

        <CosmicOrbitSimulation />
        <CosmicGNSSOrbital />
        <CosmicWormhole />
        <CosmicGNSSOrbitalV2 />

        <CosmicMinistrySpirit name="Intelligence Spirit" />
        <CosmicMinistryThrone name="Intelligence Throne" />
        <CosmicMinistryThroneAscended name="Intelligence Throne — Ascended" />
        <CosmicMinistryThroneEternal name="Intelligence — Eternal Throne" />

        <CosmicGNSSAstral />
        <CosmicDivineBeing name="Intelligence — Divine Being" />
        <CosmicAstralDivination />

      </div>
    </CosmicPage>
  );
}
