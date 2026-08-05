import { legitimacyMessages } from "./notifications";

export async function sendLegitimacySlack(stage: string, webhook: string) {
  const msg = legitimacyMessages[stage];

  const payload = {
    attachments: [
      {
        color: msg.color,
        blocks: [
          {
            type: "header",
            text: { type: "plain_text", text: msg.title, emoji: true },
          },
          {
            type: "section",
            text: { type: "mrkdwn", text: msg.body },
          },
          {
            type: "context",
            elements: [
              { type: "mrkdwn", text: "ATS Legitimacy Engine • Supabase" },
            ],
          },
        ],
      },
    ],
  };

  await fetch(webhook, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
