import { useEffect, useState } from "react";
import { createMultiChannel, removeChannel } from "../../supabaseClient";

export const useCrestSanctification = () => {
  const [aura, setAura] = useState("gold");

  useEffect(() => {
    const channel = createMultiChannel([
      {
        table: "crests",
        handlers: {
          onInsert: (p) => setAura(p.new.aura),
        },
      },
    ]);

    return () => removeChannel(channel);
  }, []);

  return { aura, setAura };
};
