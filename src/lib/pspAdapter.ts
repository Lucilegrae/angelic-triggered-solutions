/**
 * ATS PSP Adapter
 * ----------------
 * A unified interface for all payment providers.
 * Converts ATS → Provider requests
 * Converts Provider → ATS responses
 * Normalizes statuses, errors, and retry signals.
 */

export type PSPInitRequest = {
  payment_id: string;
  amount: number;
  currency: string;
  ins_uuid: string;
  sector: string;
  callback_url: string;
};

export type PSPStatusRequest = {
  payment_id: string;
  provider_ref: string;
};

export type PSPInitResponse = {
  ok: boolean;
  reference?: string;
  raw?: any;
  error?: string;
};

export type PSPStatusResponse = {
  ok: boolean;
  status: "pending" | "initiated" | "success" | "failed" | "timeout";
  raw?: any;
  error?: string;
};

/**
 * Provider registry
 * Add new providers here.
 */
const providers = {
  ecocash: {
    init: async (req: PSPInitRequest): Promise<PSPInitResponse> => {
      try {
        const res = await fetch(
          `${process.env.ATS_PAYMENT_PROVIDER_BASE_URL}/ecocash/initiate`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req)
          }
        );

        if (!res.ok) {
          return {
            ok: false,
            error: await res.text()
          };
        }

        const data = await res.json();

        return {
          ok: true,
          reference: data.reference,
          raw: data
        };
      } catch (e: any) {
        return { ok: false, error: e.message };
      }
    },

    status: async (req: PSPStatusRequest): Promise<PSPStatusResponse> => {
      try {
        const res = await fetch(
          `${process.env.ATS_PAYMENT_PROVIDER_BASE_URL}/ecocash/status`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req)
          }
        );

        if (!res.ok) {
          return {
            ok: false,
            status: "pending",
            error: await res.text()
          };
        }

        const data = await res.json();

        return {
          ok: true,
          status: normalizeStatus(data.status),
          raw: data
        };
      } catch (e: any) {
        return {
          ok: false,
          status: "pending",
          error: e.message
        };
      }
    }
  },

  paynow: {
    init: async (req: PSPInitRequest): Promise<PSPInitResponse> => {
      try {
        const res = await fetch(
          `${process.env.ATS_PAYMENT_PROVIDER_BASE_URL}/paynow/initiate`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req)
          }
        );

        if (!res.ok) {
          return { ok: false, error: await res.text() };
        }

        const data = await res.json();

        return {
          ok: true,
          reference: data.poll_url,
          raw: data
        };
      } catch (e: any) {
        return { ok: false, error: e.message };
      }
    },

    status: async (req: PSPStatusRequest): Promise<PSPStatusResponse> => {
      try {
        const res = await fetch(req.provider_ref);

        if (!res.ok) {
          return {
            ok: false,
            status: "pending",
            error: await res.text()
          };
        }

        const data = await res.json();

        return {
          ok: true,
          status: normalizeStatus(data.status),
          raw: data
        };
      } catch (e: any) {
        return {
          ok: false,
          status: "pending",
          error: e.message
        };
      }
    }
  }
};

/**
 * Normalize provider statuses → ATS statuses
 */
function normalizeStatus(status: string): PSPStatusResponse["status"] {
  const s = status.toLowerCase();

  if (["paid", "success", "completed"].includes(s)) return "success";
  if (["failed", "declined", "error"].includes(s)) return "failed";
  if (["pending", "awaiting", "processing"].includes(s)) return "pending";
  if (["initiated", "created"].includes(s)) return "initiated";
  if (["timeout", "expired"].includes(s)) return "timeout";

  return "pending";
}

/**
 * Main adapter interface
 */
export async function pspInitiate(provider: string, req: PSPInitRequest) {
  const handler = providers[provider];
  if (!handler) {
    return { ok: false, error: `Unknown provider: ${provider}` };
  }
  return handler.init(req);
}

export async function pspStatus(provider: string, req: PSPStatusRequest) {
  const handler = providers[provider];
  if (!handler) {
    return { ok: false, status: "pending", error: `Unknown provider: ${provider}` };
  }
  return handler.status(req);
}
