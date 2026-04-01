import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./SupabaseTest.css"; // external CSS for animations

export default function SupabaseTest() {
  const [projects, setProjects] = useState([]);
  const [stakeholders, setStakeholders] = useState([]);
  const [affirmations, setAffirmations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data: projectsData, error: projectsError } = await supabase
          .from("projects")
          .select("id, title, description, aura_overlay, pdf_export_link");
        if (projectsError) throw projectsError;
        setProjects(projectsData);

        let { data: stakeholdersData, error: stakeholdersError } = await supabase
          .from("stakeholders")
          .select("id, name, role, contact_email, pledge_line");
        if (stakeholdersError) throw stakeholdersError;
        setStakeholders(stakeholdersData);

        let { data: affirmationsData, error: affirmationsError } = await supabase
          .from("affirmations")
          .select("id, slogan, ceremonial_arc, created_at");
        if (affirmationsError) throw affirmationsError;
        setAffirmations(affirmationsData);

      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const auraClass = (overlay) => {
    switch (overlay?.toLowerCase()) {
      case "glow overlay":
        return "card glow";
      case "golden aura":
        return "card golden";
      case "emerald arc":
        return "card emerald";
      default:
        return "card neutral";
    }
  };

  return (
    <div className="page">
      <h1>Supabase Connectivity Showcase</h1>
      {error && <p className="error">Error: {error}</p>}

      <section>
        <h2>Projects</h2>
        {projects.map(p => (
          <div key={p.id} className={auraClass(p.aura_overlay)}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p><strong>Aura:</strong> {p.aura_overlay}</p>
            <a href={p.pdf_export_link} target="_blank" rel="noreferrer">PDF Export</a>
          </div>
        ))}
      </section>

      <section>
        <h2>Stakeholders</h2>
        {stakeholders.map(s => (
          <div key={s.id} className="card purple">
            <h3>{s.name} — {s.role}</h3>
            <p><strong>Email:</strong> {s.contact_email}</p>
            <p><em>{s.pledge_line}</em></p>
          </div>
        ))}
      </section>

      <section>
        <h2>Affirmations</h2>
        {affirmations.map(a => (
          <div key={a.id} className="card pink">
            <h3>"{a.slogan}"</h3>
            <p>{a.ceremonial_arc}</p>
            <small>Created at: {new Date(a.created_at).toLocaleString()}</small>
          </div>
        ))}
      </section>
    </div>
  );
}
