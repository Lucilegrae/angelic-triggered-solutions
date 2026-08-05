import { serve } from "https://deno.land/std/http/server.ts";

serve(() => {
  return new Response(
    JSON.stringify({
      keys: [
        {
          kty: "EC",
          crv: "P-256",
          alg: "ES256",
          use: "sig",
          kid: "ats-es256-key-1",
          x: "da1kIcrNs38aTFnQuWal8eFwRXKaYBl5Pn17uFA0L2g",
          y: "GYT_IxKC-alKRnUdorR20T0Y1kIvtcaoNdLdWEqCk68"
        }
      ]
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600"
      }
    }
  );
});
