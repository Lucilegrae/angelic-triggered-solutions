"use client";

export function useRpcMutation() {
  return {
    mutate: () => {},
    loading: false,
    error: null,
  };
}
