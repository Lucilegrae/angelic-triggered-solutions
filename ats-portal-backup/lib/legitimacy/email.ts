import { legitimacyMessages } from "./notifications";

export function buildLegitimacyEmail(stage: string) {
  const msg = legitimacyMessages[stage];

  return {
    subject: msg.title,
    body: `
ATS Legitimacy Update

${msg.body}

Stage: ${stage.toUpperCase()}
Progress: ${
      stage === "initiated"
        ? "25%"
        : stage === "verified"
        ? "50%"
        : stage === "sanctified"
        ? "75%"
        : "100%"
    }

Angelic Triggered Solutions
Legitimacy Federation Engine
`.trim(),
  };
}
