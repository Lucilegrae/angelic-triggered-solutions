import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="aura-bg">
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
