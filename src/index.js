// index.js
import React from "react";
import ReactDOM from "react-dom/client";

// ✦ Toggle between App.jsx (main app) and App.js (onboarding flow)
import AppMain from "./App.jsx";      // Golden Aura App Integration
import AppOnboarding from "./App.js"; // Ritual Onboarding Flow

const root = ReactDOM.createRoot(document.getElementById("root"));

// ✦ Choose which App to render
// Switch between AppMain and AppOnboarding by commenting/uncommenting
root.render(
  <React.StrictMode>
    {/* <AppMain /> */}        {/* Golden Aura App Integration */}
    <AppOnboarding />        {/* Ritual Onboarding Flow */}
  </React.StrictMode>
);
