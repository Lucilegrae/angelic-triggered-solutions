import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { supabase } from "./supabaseClient";

function App() {
  const [affirmations, setAffirmations] = useState([]);

  useEffect(() => {
    const fetchAffirmations = async () => {
      const { data, error } = await supabase
        .from("affirmations")
        .select("*");

      if (error) {
        console.error("Error fetching affirmations:", error);
      } else {
        setAffirmations(data);
      }
    };

    fetchAffirmations();
  }, []);

  return (
    <div className="app-container aura-overlay">
      <Navigation />
      <Banner />
      <main>
        <section>
          <h2>Affirmations</h2>
          <ul>
            {affirmations.map((item) => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
