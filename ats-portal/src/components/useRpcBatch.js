"use client";

export function useRpcBatch() {
  return {
    executeBatch: () => {},
    loading: false,
    error: null,
  };
}
