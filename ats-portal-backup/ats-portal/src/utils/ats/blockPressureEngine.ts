export type AtsBlock = {
  block: string;
  max_units: number;
  current_units: number;
};

export type AtsBlockPressure = {
  block: string;
  max_units: number;
  current_units: number;
  remaining_units: number;
  pressure: number;
  band: "Safe" | "Moderate" | "High" | "Critical";
};

export function computeBlockPressure(blocks: AtsBlock[]): AtsBlockPressure[] {
  return blocks.map((b) => {
    const pressure = (b.current_units / b.max_units) * 100;

    let band: "Safe" | "Moderate" | "High" | "Critical" = "Safe";

    if (pressure > 90) band = "Critical";
    else if (pressure > 70) band = "High";
    else if (pressure > 40) band = "Moderate";

    return {
      block: b.block,
      max_units: b.max_units,
      current_units: b.current_units,
      remaining_units: b.max_units - b.current_units,
      pressure: Math.round(pressure),
      band,
    };
  });
}
