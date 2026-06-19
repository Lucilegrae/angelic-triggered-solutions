import { useEffect, useState } from "react";
import { fetchFederationData } from "./federation.service";
import { createMultiChannel, removeChannel } from "../../supabaseClient";

export const useFederationData = () => {
  const [data, setData] = useState({ institutions: [] });

  useEffect(() => {
    fetchFederationData().then(setData);

    const channel = createMultiChannel([
      {
        table: "institutions",
        handlers: {
          onInsert: (p) =>
            setData((prev) => ({
              institutions: [...prev.institutions, p.new],
            })),
          onUpdate: (p) =>
            setData((prev) => ({
              institutions: prev.institutions.map((i) =>
                i.id === p.new.id ? p.new : i
              ),
            })),
          onDelete: (p) =>
            setData((prev) => ({
              institutions: prev.institutions.filter(
                (i) => i.id !== p.old.id
              ),
            })),
        },
      },
    ]);

    return () => removeChannel(channel);
  }, []);

  return { data };
};
