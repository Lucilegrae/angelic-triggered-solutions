// Supabase GraphQL fetch example

async function fetchStakeholders() {
  const response = await fetch(
    "https://wtifrlhiyzudgppqswzw.supabase.co/graphql/v1",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      },
      body: JSON.stringify({
        query: `
          query {
            stakeholders {
              id
              name
              progress_stage
            }
          }
        `
      })
    }
  );

  const data = await response.json();
  console.log("Stakeholders:", data);
}

fetchStakeholders();
