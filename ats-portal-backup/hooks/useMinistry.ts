import useSWR from "swr";

const fetcher = (url: string, token: string) =>
  fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());

export function useMinistryCoverage(token: string) {
  return useSWR(["/api/ministry/coverage", token], ([url, t]) =>
    fetcher(url, t)
  );
}

export function useTierLoad(token: string) {
  return useSWR(["/api/ministry/tier-load", token], ([url, t]) =>
    fetcher(url, t)
  );
}

export function useEstatePressure(token: string) {
  return useSWR(["/api/ministry/estate-pressure", token], ([url, t]) =>
    fetcher(url, t)
  );
}

export function useRisk(token: string) {
  return useSWR(["/api/ministry/risk", token], ([url, t]) =>
    fetcher(url, t)
  );
}

export function useLifecycle(token: string) {
  return useSWR(["/api/ministry/lifecycle", token], ([url, t]) =>
    fetcher(url, t)
  );
}
