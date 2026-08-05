export type CosmicPressureInput = {
  sectorId: string;
  basePressure: number;
  astralPressure: number;
  gnssOrbitalPhase: number;
  parallelTimelineCount: number;
};

export function computeCosmicPressure(input: CosmicPressureInput): number {
  const gnssFactor = 0.4 + input.gnssOrbitalPhase * 0.6;
  const timelineFactor = 1 + input.parallelTimelineCount * 0.05;

  return (
    input.basePressure * gnssFactor * timelineFactor +
    input.astralPressure * 0.8
  );
}
