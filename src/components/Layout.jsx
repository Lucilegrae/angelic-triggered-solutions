import React from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import StakeholdersList from "./StakeholdersList.jsx";
import GlyphCard from "./GlyphCard.jsx";

export default function Layout({ children }) {
  return (
    <div className="layout aura-bg">
      {/* Global navigation at the top */}
      <Navbar />

      {/* Main content area */}
      <main className="content">
        {children}

        {/* Optional aura components that appear across all pages */}
        <StakeholdersList />
        <GlyphCard />
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}
