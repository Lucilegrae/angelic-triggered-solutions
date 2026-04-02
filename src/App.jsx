import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import Banner from "./components/Banner.jsx";
import AffirmationsList from "./components/AffirmationsList.jsx";
import AddProjectForm from "./components/AddProjectForm.jsx";
import ProjectsList from "./components/ProjectsList.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import StakeholdersList from "./components/StakeholdersList.jsx";
import GlyphCard from "./components/GlyphCard.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Mission from "./pages/Mission.jsx";
import Vision from "./pages/Vision.jsx";
import Values from "./pages/Values.jsx";
import Projects from "./pages/Projects.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import "./theme.css";

export default function App() {
  return (
    <Router>
      <Layout>
        <Banner />
        <AffirmationsList />
        <ProjectsList />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}
