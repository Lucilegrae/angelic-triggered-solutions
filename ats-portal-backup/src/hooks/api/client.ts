"use client";

import { useState, useEffect } from "react";

export function useApiPost<TArgs, TData>(path: string) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function call(args: TArgs) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(path, {
        method: "POST",
        body: JSON.stringify(args),
      });

      const json = await res.json();
      if (!json.ok) throw new Error(json.error);

      setData(json.result ?? json.data ?? json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { call, loading, data, error };
}

export function useApiGet<TData>(path: string, immediate: boolean = true) {
  const [loading, setLoading] = useState(immediate);
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(path);
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);

      setData(json.result ?? json.data ?? json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (immediate) load();
  }, [path, immediate]);

  return { load, loading, data, error };
}
