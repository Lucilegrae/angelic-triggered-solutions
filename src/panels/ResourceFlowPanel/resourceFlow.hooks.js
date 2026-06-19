import { useEffect, useState } from "react";
import { fetchResourceFlows } from "./resourceFlow.service";
import { createMultiChannel, removeChannel } from "../../supabaseClient";

export const useResourceFlow = () => {
  const [flows, setFlows] = useState([]);

  useEffect(() => {
    fetchResourceFlows().then(setFlows);

    const channel = createMultiChannel([
      {
        table: "resource_flows",
        handlers: {
          onInsert: (p) => setFlows((prev) => [...prev, p.new]),
          onUpdate: (p) =>
            setFlows((prev) =>
              prev.map((f) => (f.id === p.new.id ? p.new : f))
            ),
        },
      },
    ]);

    return () => removeChannel(channel);
  }, []);

  return { flows };
};
