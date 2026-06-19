import { useEffect, useState } from "react";
import { fetchCosmicUnity } from "./cosmicUnity.service";
import { createMultiChannel, removeChannel } from "../../supabaseClient";

export const useCosmicUnity = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchCosmicUnity().then(setData);

    const channel = createMultiChannel([
      {
        table: "cadence_snapshots",
        handlers: {
          onInsert: () => fetchCosmicUnity().then(setData),
          onUpdate: () => fetchCosmicUnity().then(setData),
        },
      },
    ]);

    return () => removeChannel(channel);
  }, []);

  return { data };
};
