"use client";

import "./globals.css";
import ATSSuperRibbon from "@/components/ATSSuperRibbon";
import { useEffect } from "react";
import "./ats.css";

export default function RootLayout({ children }) {
  useEffect(() => {
    const ambient = new Audio('/sovereign-ambient.mp3');
    ambient.loop = true;
    ambient.volume = 0.15;
    ambient.play().catch(() => {});
  }, []);

  return (
    <html lang="en">
      <body className="body-cosmic text-slate-200">
        <div className="cosmic-layer" />
        <ATSSuperRibbon />
        <div className="relative z-10 p-6">
          {children}
        </div>
      </body>
    </html>
  );
}
