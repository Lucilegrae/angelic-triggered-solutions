import React, { useEffect } from "react";
import DebugOverlay from "./DebugOverlay";
import LifecycleLogger from "./LifecycleLogger";

export default function RouteWrapper({ children, name, propsSnapshot = {} }) {
  useEffect(() => {
    console.group(`🔵 Mounted: ${name}`);
    console.log("Props snapshot:", propsSnapshot);
    console.groupEnd();

    return () => {
      console.log(`⚪ Unmounted: ${name}`);
    };
  }, [name, propsSnapshot]);

  return (
    <>
      {children}
      <DebugOverlay current={name} />
      <LifecycleLogger name={name} />
    </>
  );
}
