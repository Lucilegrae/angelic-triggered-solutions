import React, { useState, useEffect } from "react";
import { useRealtimeLists } from "../hooks/useRealtimeLists";
import SoundToggle from "../components/SoundToggle";
import ProjectsTab from "../components/ProjectsTab";
import AffirmationsTab from "../components/AffirmationsTab";
import StakeholdersTab from "../components/StakeholdersTab";
import FilterPanel from "../components/FilterPanel";
import "./../theme.css";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("projects");
  const [debouncing, setDebouncing] = useState(false);

  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem("soundEnabled");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("soundEnabled", JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // ✅ Unified filter states
  const [stakeholderInput, setStakeholderInput] = useState(42);
  const [dateFilter, setDateFilter] = useState("2026-04-01");
  const [arcKeyword, setArcKeyword] = useState("covenant");
  const [roleFilter, setRoleFilter] = useState("");
  const [emailKeyword, setEmailKeyword] = useState("");

  // ✅ Unified realtime hook with filters
  const { projects, affirmations, stakeholders, loading } = useRealtimeLists(
    ["projects", "affirmations", "stakeholders"],
    {
      projects: { stakeholderId: stakeholderInput },
      affirmations: { stakeholderId: stakeholderInput, dateFilter, arcKeyword },
      stakeholders: { roleFilter, emailKeyword },
    }
  );

  return (
    <section className={`aura-bg ${activeTab}-aura`}>
      {/* Unified Filter Panel */}
      <FilterPanel
        stakeholderInput={stakeholderInput}
        setStakeholderInput={setStakeholderInput}
        dateInput={dateFilter}
        setDateInput={setDateFilter}
        arcInput={arcKeyword}
        setArcInput={setArcKeyword}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        emailKeyword={emailKeyword}
        setEmailKeyword={setEmailKeyword}
      />

      {/* Tab Navigation */}
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setActiveTab("projects")} className="tab-btn projects">Projects</button>
        <button onClick={() => setActiveTab("stakeholders")} className="tab-btn stakeholders">Stakeholders</button>
        <button onClick={() => setActiveTab("affirmations")} className="tab-btn affirmations">Affirmations</button>
      </div>

      {/* Sound Toggle */}
      <SoundToggle activeTab={activeTab} soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />

      {/* Tab Content */}
      <div className={`tab-content fade-in ${activeTab}`}>
        {activeTab === "projects" && (
          <ProjectsTab projects={projects} stakeholderId={stakeholderInput} />
        )}

        {activeTab === "affirmations" && (
          <AffirmationsTab affirmations={affirmations} stakeholderId={stakeholderInput} />
        )}

        {activeTab === "stakeholders" && (
          <StakeholdersTab stakeholders={stakeholders} />
        )}
      </div>

      {/* Spinner Overlay */}
      {(debouncing || loading) && (
        <div className="spinner-overlay">
          <div
            className={`spinner ${
              activeTab === "projects"
                ? "spinner-projects"
                : activeTab === "stakeholders"
                ? "spinner-stakeholders"
                : "spinner-affirmations"
            }`}
          />
        </div>
      )}
    </section>
  );
}
