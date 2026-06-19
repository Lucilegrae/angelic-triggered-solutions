import { serve } from "https://deno.land/std/http/server.ts";

serve(() => {
  return new Response(
    JSON.stringify({
      keys: [
        {
          kty: "EC",
          crv: "P-256",
          x: "gFQyKF7Vi_Z_gdzBsmD4w7__4JoU6Ne9inBdg3QU4io",
          y: "atB8f3DtajbYCLlRSkuAN_Mus95gnAlzlz3GW2L5L68",
          use: "sig",
          alg: "ES256",
          kid: "ats-es256-key-1"
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
