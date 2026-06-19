import { useEffect, useState } from "react";
import { fetchHeatmapData } from "./legitimacy.service";
import { createMultiChannel, removeChannel } from "../../supabaseClient";

export const useLegitimacyHeatmap = () => {
  const [data, setData] = useState({ regions: [] });

  useEffect(() => {
    fetchHeatmapData().then(setData);

    const channel = createMultiChannel([
      {
        table: "legitimacy_regions",
        handlers: {
          onUpdate: () => fetchHeatmapData().then(setData),
        },
      },
    ]);

    return () => removeChannel(channel);
  }, []);

  return { data };
};
