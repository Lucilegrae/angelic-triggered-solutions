import { useEffect, useState } from "react";
import { createMultiChannel, removeChannel } from "../../supabaseClient";

export const useOperatorState = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const channel = createMultiChannel([
      {
        table: "cadence_logs",
        handlers: {
          onInsert: (p) => setLogs((prev) => [...prev, p.new]),
        },
      },
    ]);

    return () => removeChannel(channel);
  }, []);

  return { logs };
};
