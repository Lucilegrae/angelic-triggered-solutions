import { cookies } from "next/headers";
import { verifyAtsToken } from "../../middleware/verifyAtsToken";

export async function loadPayload() {
  const token = cookies().get("ats_access_token")?.value;
  if (!token) return null;

  try {
    const payload = await verifyAtsToken(token);
    return payload;
  } catch {
    return null;
  }
}
