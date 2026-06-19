import { useEffect, useState } from "react";
import { fetchChronicleEvents } from "./chronicle.service";
import { createMultiChannel, removeChannel } from "../../supabaseClient";

export const useChronicle = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ keyword: "" });

  useEffect(() => {
    fetchChronicleEvents().then(setEvents);

    const channel = createMultiChannel([
      {
        table: "chronicle_events",
        handlers: {
          onInsert: (p) => setEvents((prev) => [p.new, ...prev]),
        },
      },
    ]);

    return () => removeChannel(channel);
  }, []);

  return { events, filters, setFilters };
};
