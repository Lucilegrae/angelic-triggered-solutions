import { useEffect, useState } from "react";
import { performExport } from "./anthology.service";
import { createMultiChannel, removeChannel } from "../../supabaseClient";

export const useAnthologyExports = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const channel = createMultiChannel([
      {
        table: "anthology_exports",
        handlers: {
          onInsert: (p) => setHistory((prev) => [...prev, p.new]),
        },
      },
    ]);

    return () => removeChannel(channel);
  }, []);

  const triggerExport = async (format) => {
    await performExport(format);
  };

  return { history, triggerExport };
};
