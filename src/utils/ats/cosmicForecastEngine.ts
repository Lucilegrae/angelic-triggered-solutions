export type CosmicForecastPoint = {
  timestamp: string;
  projectedPressure: number;
  projectedCapacityUtilization: number;
};

export function forecastCosmicAllocation(
  currentPressure: number,
  currentUtilization: number,
  steps: number,
): CosmicForecastPoint[] {
  const result: CosmicForecastPoint[] = [];
  let pressure = currentPressure;
  let utilization = currentUtilization;

  for (let i = 0; i < steps; i++) {
    pressure = pressure * 0.97 + 1.5;
    utilization = Math.min(1, utilization * 0.99 + 0.01);

    result.push({
      timestamp: new Date(Date.now() + i * 60_000).toISOString(),
      projectedPressure: pressure,
      projectedCapacityUtilization: utilization,
    });
  }

  return result;
}
