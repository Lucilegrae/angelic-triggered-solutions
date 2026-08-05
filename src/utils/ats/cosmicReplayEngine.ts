export type CosmicAllocationEvent = {
  allocationId: string;
  timestamp: string;
  pressureScore: number;
  capacityUsed: number;
};

export function buildCosmicReplay(events: CosmicAllocationEvent[]) {
  return events.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}
