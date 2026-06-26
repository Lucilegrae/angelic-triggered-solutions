export const handler = async () => {
  return new Response(
    JSON.stringify({
      keys: [
        {
          kty: "EC",
          crv: "P-256",
          x: "Szxp-e49CSqYSeOQGiyAUK1Vm2DllvSQ-74-6l4or7k",
          y: "Gv3Oq-BFcANVfJqPCKHP5pVm2JBdROAMFlfeYhnx-Bk",
          use: "sig",
          alg: "ES256",
          kid: "ats-es256-key-1"
        }
      ]
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60"
      }
    }
  );
};
