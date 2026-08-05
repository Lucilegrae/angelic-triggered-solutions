"use client";

export function useGlyphStreamRpc() {
  return {
    stream: [],
    loading: false,
    error: null,
    refresh: () => {},
  };
}
