import { serve } from "https://deno.land/std/http/server.ts";

serve(() => {
  const jwks = {
    keys: []
  };

  return new Response(JSON.stringify(jwks), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300"
    }
  });
});
