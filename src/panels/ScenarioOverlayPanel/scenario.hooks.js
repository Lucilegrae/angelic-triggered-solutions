import { useEffect, useState } from "react";
import { fetchScenarios } from "./scenario.service";
import { createMultiChannel, removeChannel } from "../../supabaseClient";

export const useScenarios = () => {
  const [scenarios, setScenarios] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchScenarios().then(setScenarios);

    const channel = createMultiChannel([
      {
        table: "scenarios",
        handlers: {
          onInsert: (p) => setScenarios((prev) => [...prev, p.new]),
          onUpdate: (p) =>
            setScenarios((prev) =>
              prev.map((s) => (s.id === p.new.id ? p.new : s))
            ),
          onDelete: (p) =>
            setScenarios((prev) => prev.filter((s) => s.id !== p.old.id)),
        },
      },
    ]);

    return () => removeChannel(channel);
  }, []);

  return { scenarios, selected, setSelected };
};
