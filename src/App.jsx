import React from "react";
import Banner from "./Banner";
import Navigation from "./Navigation";
import Footer from "./Footer";
import AffirmationsList from "./AffirmationsList";
import ProjectsList from "./ProjectsList";
import StakeholdersList from "./StakeholdersList";

function App() {
  return (
    <div className="app-container aura-overlay">
      <Navigation />
      <Banner />
      <main>
        <AffirmationsList />
        <ProjectsList />
        <StakeholdersList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
