import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Banner from "./components/Banner";
import AffirmationsList from "./components/AffirmationsList";
import AddProjectForm from "./components/AddProjectForm";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import StakeholdersList from "./components/StakeholdersList";
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
import ErrorDashboard from "./pages/ErrorDashboard";  // ✅ new dashboard page

import ErrorBoundary from "./components/ErrorBoundary";
import "./theme.css";

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
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
            <Route path="/errors" element={<ErrorDashboard />} /> {/* ✅ new route */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}
