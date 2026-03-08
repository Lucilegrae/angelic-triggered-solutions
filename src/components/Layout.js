import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {/* Banner tagline */}
      <div className="banner">
        ✨ Motif‑driven healing for communities ✨
      </div>
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
