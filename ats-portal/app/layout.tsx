import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MinistrySidebar from "@/components/MinistrySidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ATS Ministry Dashboard",
  description: "Angelic Triggered Solutions · Production Ministry Analytics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-wide">
                ATS Ministry Federation
              </h1>
              <p className="text-xs text-slate-400">
                Angelic Triggered Solutions · Production Ministry Analytics
              </p>
            </div>
          </header>

          {/* ⭐ Updated main block with sidebar */}
          <main className="flex flex-1">
            <div className="hidden lg:block">
              <MinistrySidebar />
            </div>

            <div className="flex-1 px-6 py-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
