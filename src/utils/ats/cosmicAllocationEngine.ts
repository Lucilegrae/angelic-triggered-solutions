export type CosmicAllocationInput = {
  ministryId: string;
  sectorId: string;
  blockId: string;
  capacity: number;
  pressureIndex: number;
  gnssOrbitalPhase: number;
  astralPressure: number;
  temporalLatticeStability: number;
};

export type CosmicAllocationResult = {
  allocationId: string;
  allocatedCapacity: number;
  residualCapacity: number;
  cosmicPressureScore: number;
  gnssOrbitalBand: string;
  timelineAnchor: string;
};

export function runCosmicAllocation(input: CosmicAllocationInput): CosmicAllocationResult {
  const cosmicPressureScore =
    input.pressureIndex +
    input.astralPressure * 0.7 +
    (1 - input.temporalLatticeStability) * 0.5;

  const allocatedCapacity = Math.max(
    0,
    Math.min(input.capacity, input.capacity * (1 - cosmicPressureScore / 100)),
  );

  return {
    allocationId: `${input.ministryId}-${input.sectorId}-${Date.now()}`,
    allocatedCapacity,
    residualCapacity: input.capacity - allocatedCapacity,
    cosmicPressureScore,
    gnssOrbitalBand: input.gnssOrbitalPhase > 0.5 ? "ASCENDING_ORBIT" : "DESCENDING_ORBIT",
    timelineAnchor: new Date().toISOString(),
  };
}
