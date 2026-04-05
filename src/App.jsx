import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Banner from "./components/Banner";
import AffirmationsList from "./components/AffirmationsList";
import AddProjectForm from "./components/AddProjectForm";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
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
import Dashboard from "./pages/Dashboard";

import ErrorBoundary from "./components/ErrorBoundary";
import "./theme.css";

// ✅ Lazy load modular ErrorDashboard
const ErrorDashboard = lazy(() => import("./components/ErrorDashboard/ErrorDashboard"));

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Layout>
          <Navbar />
          <Banner />
          <GlyphStream />
          <AffirmationsList />
          <AddProjectForm />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/values" element={<Values />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* ✅ Modular ErrorDashboard route */}
            <Route
              path="/errors"
              element={
                <Suspense fallback={<p>Loading Error Dashboard...</p>}>
                  <ErrorDashboard />
                </Suspense>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </Layout>
      </ErrorBoundary>
    </Router>
  );
}
