// ✦ Golden Aura App Integration ✦
import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Banner from "./components/Banner";
import AffirmationsList from "./components/AffirmationsList";
import AddProjectForm from "./components/AddProjectForm";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";   // ✦ Branch-colored aura navbar
import GlyphStream from "./components/GlyphStream";

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
import Index from "./pages/Index.jsx";
import AuditTrailLedger from "./components/AuditTrailLedger";
import AuditDashboard from "./components/AuditDashboard";

import ErrorBoundary from "./components/ErrorBoundary";
import "./theme.css";

// ✅ Lazy load modular ErrorDashboard
const ErrorDashboard = lazy(() => import("./components/ErrorDashboard/ErrorDashboard"));

// 🔑 Auth context + components
import { AuthProvider } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";
import AuditArchiveTab from "./components/AuditArchiveTab";

// ✦ Retry Control Panel ✦
import RetryControlPanel from "./components/RetryControlPanel";

// ✦ Covenant Portal Chambers ✦
import PortalChambers from "./PortalChambers";
import PortalChambersStyled from "./components/PortalChambersStyled";

// ✦ Seal Constellation ✦
import SealConstellationView from "./SealConstellationView";

export default function App() {
  // ✦ State to track branchFilter from SealConstellationView
  const [branchFilter, setBranchFilter] = useState("all");

  const demoLedger = [
    { glyph: "✦", timestamp: "2026-05-01, 06:00", blessings: 12, branch: "flame" },
    { glyph: "✦", timestamp: "2026-05-01, 06:05", blessings: 8, branch: "river" },
    { glyph: "✦", timestamp: "2026-05-01, 06:10", blessings: 15, branch: "stone" },
    { glyph: "✦", timestamp: "2026-05-01, 06:15", blessings: 20, branch: "all" }
  ];

  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <Layout>
            {/* ✦ Navbar aura follows branchFilter */}
            <Navbar branch={branchFilter} />

            <Banner />
            <GlyphStream />
            <AffirmationsList />
            <AddProjectForm />
            <LoginForm />
            <AuditArchiveTab />

            <Routes>
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

              <Route
                path="/errors"
                element={
                  <Suspense fallback={<p>Loading Error Dashboard...</p>}>
                    <ErrorDashboard />
                  </Suspense>
                }
              />

              <Route path="/portal" element={<PortalChambers />} />
              <Route path="/portal-styled" element={<PortalChambersStyled />} />

              {/* ✦ Seal Constellation route updates branchFilter */}
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

              <Route path="*" element={<NotFound />} />
            </Routes>

            <section className="ceremonial-dashboard">
              <h1>✨ Ceremonial Dashboard ✦</h1>
              <RetryControlPanel />
            </section>

            <Footer />
          </Layout>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}
