import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

const JWT_SECRET = Deno.env.get("JWT_SECRET") ?? "";

if (!JWT_SECRET) {
  console.error("JWT_SECRET is required in environment variables");
}

type Role = "admin" | "operator" | "auditor" | "seer";

const USERS: Record<string, { password: string; role: Role }> = {
  "prince": { password: "architect-key", role: "admin" },
  "operator1": { password: "operator-key", role: "operator" },
  "auditor1": { password: "auditor-key", role: "auditor" },
  "seer1": { password: "seer-key", role: "seer" },
};

function base64url(input: string) {
  return btoa(input)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function signJwt(payload: Record<string, unknown>): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const encHeader = base64url(JSON.stringify(header));
  const encPayload = base64url(JSON.stringify(payload));

  const data = `${encHeader}.${encPayload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data),
  );

  const encSignature = base64url(
    String.fromCharCode(...new Uint8Array(signature)),
  );

  return `${data}.${encSignature}`;
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: "username and password required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const user = USERS[username];
    if (!user || user.password !== password) {
      return new Response(
        JSON.stringify({ error: "invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    const now = Math.floor(Date.now() / 1000);
    const exp = now + 60 * 60; // 1 hour

    const payload = {
      sub: username,
      role: user.role,
      iat: now,
      exp,
    };

    const token = await signJwt(payload);

    return new Response(
      JSON.stringify({ token, role: user.role }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: "internal error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});
