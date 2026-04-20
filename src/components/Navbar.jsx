import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./../styles/theme.css";   // 🌌 Import aura theme

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8); // 🌌 default aura volume

  // 🌌 Audio refs for layered aura sounds
  const chimeOpenHarp = useRef(null);
  const chimeOpenBell = useRef(null);
  const chimeCloseHarp = useRef(null);
  const chimeCloseBell = useRef(null);

  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/mission", label: "Mission" },
    { path: "/vision", label: "Vision" },
    { path: "/values", label: "Values" },
    { path: "/projects", label: "Projects" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/audit", label: "Audit Trail" }
  ];

  const playSound = (ref) => {
    if (ref.current) {
      ref.current.volume = muted ? 0 : volume;
      ref.current.play();
    }
  };

  const toggleMenu = () => {
    if (isOpen) {
      setClosing(true);
      playSound(chimeCloseHarp);
      playSound(chimeCloseBell);
      setTimeout(() => {
        setIsOpen(false);
        setClosing(false);
      }, 1000); // synchronized with auraTrailOut + menu fade-out
    } else {
      setIsOpen(true);
      playSound(chimeOpenHarp);
      playSound(chimeOpenBell);
    }
  };

  return (
    <nav
      className="aura-bg"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}
    >
      {/* 🌌 Logo + Slogan */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <img
          src="/logo.png"
          alt="ATS Logo"
          style={{
            height: "50px",
            width: "auto",
            filter: "drop-shadow(0 0 6px rgba(255,215,0,0.8))"
          }}
        />
        <span
          className="slogan-arc aura-heading"
          style={{ fontSize: "1.2rem", fontWeight: "bold" }}
        >
          Angelic Triggered Solutions
        </span>
      </div>

      {/* 🌌 Hamburger Toggle */}
      <button
        onClick={toggleMenu}
        className={`hamburger-btn md:hidden ${isOpen ? "hamburger-open" : closing ? "hamburger-closing" : ""}`}
        style={{ fontSize: "1.5rem" }}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* 🌌 Navigation Links */}
      <div
        className={`${
          isOpen ? "flex mobile-menu" : closing ? "flex mobile-menu-close" : "hidden"
        } md:flex flex-col md:flex-row gap-4 md:gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0`}
      >
        {links.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "nav-active" : "nav-link"
            }
            onClick={toggleMenu}
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* 🌌 Aura Sound Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <button
          onClick={() => setMuted(!muted)}
          className="text-aura hover:text-ritual"
          style={{ fontSize: "1rem" }}
        >
          {muted ? "🔇 Mute" : "🔊 Sound"}
        </button>
        <div className="volume-container">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
          <div className="volume-tooltip">
            {Math.round(volume * 100)}%
            <span className="particle"></span>
          </div>
        </div>
      </div>

      {/* 🌌 Aura Chime Audio (layered harp + bell) */}
      <audio ref={chimeOpenHarp} src="/sounds/chime-open-harp.mp3" preload="auto"></audio>
      <audio ref={chimeOpenBell} src="/sounds/chime-open-bell.mp3" preload="auto"></audio>
      <audio ref={chimeCloseHarp} src="/sounds/chime-close-harp.mp3" preload="auto"></audio>
      <audio ref={chimeCloseBell} src="/sounds/chime-close-bell.mp3" preload="auto"></audio>
    </nav>
  );
}
