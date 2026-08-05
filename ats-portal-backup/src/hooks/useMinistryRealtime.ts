"use client";

import { useEffect } from "react";

export function useMinistryRealtime(onMessage: (data: any) => void) {
  useEffect(() => {
    const ws = new WebSocket("wss://your-ats-ministry-stream.example.com");

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "subscribe", channel: "ministry" }));
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        onMessage(payload);
      } catch (e) {
        console.error("Invalid WS payload", e);
      }
    };

    return () => ws.close();
  }, [onMessage]);
}
