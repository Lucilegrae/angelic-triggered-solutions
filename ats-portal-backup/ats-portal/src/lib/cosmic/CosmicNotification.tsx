"use client";

import { useEffect } from "react";

export default function CosmicNotification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="cosmic-notification">
      {message}
    </div>
  );
}
