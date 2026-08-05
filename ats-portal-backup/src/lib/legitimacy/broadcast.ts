import { sendLegitimacySlack } from "./slack";
import { buildLegitimacyEmail } from "./email";

export async function broadcastLegitimacy(stage: string, user: any) {
  const webhook = process.env.STAKEHOLDER_WEBHOOK;

  if (webhook) {
    await sendLegitimacySlack(stage, webhook);
  }

  const email = buildLegitimacyEmail(stage);

  await fetch("/api/send-email", {
    method: "POST",
    body: JSON.stringify({
      to: user.email,
      subject: email.subject,
      body: email.body,
    }),
  });
}
