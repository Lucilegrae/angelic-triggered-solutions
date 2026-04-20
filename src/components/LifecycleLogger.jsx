import { useEffect } from "react";

export default function LifecycleLogger({ name }) {
  useEffect(() => {
    console.log(`🔵 Mounted: ${name}`);
    return () => {
      console.log(`⚪ Unmounted: ${name}`);
    };
  }, [name]);

  return null; // invisible glyph
}
