import React from "react";
import { Routes, Route } from "react-router-dom";

// ATS Panels
import FederationPanel from "./panels/FederationPanel/FederationPanel";
import CosmicUnityPanel from "./panels/CosmicUnityPanel/CosmicUnityPanel";
import ScenarioOverlayPanel from "./panels/ScenarioOverlayPanel/ScenarioOverlayPanel";
import OperatorConsole from "./panels/OperatorConsole/OperatorConsole";
import CertificateIssuancePanel from "./panels/CertificateIssuancePanel/CertificateIssuancePanel";
import AuditTrailExplorer from "./panels/AuditTrailExplorer/AuditTrailExplorer";
import AnthologyExportPanel from "./panels/AnthologyExportPanel/AnthologyExportPanel";
import CrestSanctificationPanel from "./panels/CrestSanctificationPanel/CrestSanctificationPanel";
import LegitimacyHeatmapPanel from "./panels/LegitimacyHeatmapPanel/LegitimacyHeatmapPanel";
import ResourceFlowPanel from "./panels/ResourceFlowPanel/ResourceFlowPanel";
import ChronicleTimelinePanel from "./panels/ChronicleTimelinePanel/ChronicleTimelinePanel";
import OmniversalNexusPanel from "./panels/OmniversalNexusPanel/OmniversalNexusPanel";

// Existing pages
import Home from "./pages/Home";
import About from "./pages/About";
import Mission from "./pages/Mission";
import Vision from "./pages/Vision";
import Values from "./pages/Values";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Dashboard from "./components/Dashboard";
import AuditTrailFeed from "./components/AuditTrailFeed";
import AuditTrailLedger from "./components/AuditTrailLedger";
import AuditDashboard from "./components/AuditDashboard";
import Index from "./pages/Index.jsx";

// Seal Constellation
import SealConstellationView from "./SealConstellationView";

const AppRouter = ({ branchFilter, setBranchFilter, demoLedger }) => {
  return (
    <Routes>

      {/* Existing routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/mission" element={<Mission />} />
      <Route path="/vision" element={<Vision />} />
      <Route path="/values" element={<Values />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/index" element={<Index />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/audit" element={<AuditTrailFeed />} />
      <Route path="/audit-ledger" element={<AuditTrailLedger />} />
      <Route path="/audit-dashboard" element={<AuditDashboard />} />

      {/* Seal Constellation */}
      <Route
        path="/constellation"
        element={
          <SealConstellationView
            sealLedger={demoLedger}
            branchFilter={branchFilter}
            onBranchChange={setBranchFilter}
          />
        }
      />

      {/* ATS Panels */}
      <Route path="/federation" element={<FederationPanel />} />
      <Route path="/cosmic-unity" element={<CosmicUnityPanel />} />
      <Route path="/scenarios" element={<ScenarioOverlayPanel />} />
      <Route path="/operator" element={<OperatorConsole />} />
      <Route path="/certificates" element={<CertificateIssuancePanel />} />
      <Route path="/audit-explorer" element={<AuditTrailExplorer />} />
      <Route path="/anthology" element={<AnthologyExportPanel />} />
      <Route path="/crest" element={<CrestSanctificationPanel />} />
      <Route path="/heatmap" element={<LegitimacyHeatmapPanel />} />
      <Route path="/resources" element={<ResourceFlowPanel />} />
      <Route path="/chronicle" element={<ChronicleTimelinePanel />} />
      <Route path="/nexus" element={<OmniversalNexusPanel />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
