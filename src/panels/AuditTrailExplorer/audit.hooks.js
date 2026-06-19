import { useEffect, useState } from "react";
import { fetchAuditEvents } from "./audit.service";
import { createMultiChannel, removeChannel } from "../../supabaseClient";

export const useAuditTrail = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ actor: "" });

  useEffect(() => {
    fetchAuditEvents().then(setEvents);

    const channel = createMultiChannel([
      {
        table: "audit_logs",
        handlers: {
          onInsert: (p) => setEvents((prev) => [p.new, ...prev]),
        },
      },
    ]);

    return () => removeChannel(channel);
  }, []);

  return { events, filters, setFilters };
};
