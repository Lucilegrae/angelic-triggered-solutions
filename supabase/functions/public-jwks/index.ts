export const config = {
  auth: false,
};

import { serve } from "https://deno.land/std/http/server.ts";

serve(() => {
  return new Response(
    JSON.stringify({
      keys: [
        {
          kty: "EC",
          crv: "P-256",
          x: "2Q5UudEvgh993o3Jf46b9DliWetrauL_k1qkiFX5lI",
          y: "0r3FSXfDEY1Y0UHLV57vEht-NwGiKsBGakCj_IMtG",
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
