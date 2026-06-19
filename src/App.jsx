// ✦ Golden Aura App Integration ✦
import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Layout from "./components/Layout";
import Banner from "./components/Banner";
import AffirmationsList from "./components/AffirmationsList";
import AddProjectForm from "./components/AddProjectForm";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import GlyphStream from "./components/GlyphStream";

import ErrorBoundary from "./components/ErrorBoundary";
import "./theme.css";

// 🔑 Auth context
import { AuthProvider } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";
import AuditArchiveTab from "./components/AuditArchiveTab";

// ✦ Retry Control Panel ✦
import RetryControlPanel from "./components/RetryControlPanel";

// ✦ Seal Constellation ✦
import SealConstellationView from "./SealConstellationView";

// ✦ Router with all ATS Panels ✦
import AppRouter from "./AppRouter";

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

            {/* ✦ All routing now handled by AppRouter */}
            <AppRouter
              branchFilter={branchFilter}
              setBranchFilter={setBranchFilter}
              demoLedger={demoLedger}
            />

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
