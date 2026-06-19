import { useEffect, useState } from "react";
import { createMultiChannel, removeChannel } from "../../supabaseClient";

export const useNexus = () => {
  const [state, setState] = useState({
    integratedPanels: 12,
    status: "prototype",
  });

  useEffect(() => {
    const channel = createMultiChannel([
      {
        table: "nexus_state",
        handlers: {
          onUpdate: (p) => setState(p.new),
        },
      },
    ]);

    return () => removeChannel(channel);
  }, []);

  return { state };
};
