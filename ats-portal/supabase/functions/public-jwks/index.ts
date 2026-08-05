import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async () => {
  const jwksUrl = Deno.env.get("SUPABASE_JWKS_URL");

  if (!jwksUrl) {
    return new Response(
      JSON.stringify({
        error: "SUPABASE_JWKS_URL environment variable is not configured."
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  try {
    const response = await fetch(jwksUrl);

    return new Response(await response.text(), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300"
      }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
});
