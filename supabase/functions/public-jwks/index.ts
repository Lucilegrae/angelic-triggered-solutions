export const handler = async () => {
  return new Response(
    JSON.stringify({
      keys: [
        {
          kty: "EC",
          crv: "P-256",
          x: "9zoJsudVEghQ93o3jF46b9DNiw8etraU_k1qkiFX5lI",
          y: "Of3SRYKEDfy1V0UHLTv57HetN-MwGiKsB6aHcj_IMTg",
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
