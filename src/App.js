import "./theme.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Banner from "./components/Banner";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

function AnimatedRoutes() {
  const location = useLocation();

  const bannerMap = {
    "/": { text: "Welcome to Angelic Triggered Solutions", className: "banner-home" },
    "/about": { text: "About Our Vision", className: "banner-about" },
    "/projects": { text: "Our Projects", className: "banner-projects" },
    "/services": { text: "Our Services", className: "banner-services" },
    "/contact": { text: "Contact Us", className: "banner-contact" }
  };

  const { text, className } = bannerMap[location.pathname] || {
    text: "Angelic Triggered Solutions",
    className: "banner-home"
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <Banner key={location.pathname} text={text} className={className} />
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </Router>
  );
}

export default App;
