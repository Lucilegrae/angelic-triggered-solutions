"use client";

export function useRpcQuery() {
  return {
    data: null,
    loading: false,
    error: null,
    refetch: () => {},
  };
}
