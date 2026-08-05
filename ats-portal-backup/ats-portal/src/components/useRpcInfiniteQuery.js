"use client";

export function useRpcInfiniteQuery() {
  return {
    pages: [],
    loading: false,
    error: null,
    fetchNextPage: () => {},
  };
}
