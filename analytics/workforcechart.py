import requests, os, plotext as plt
from collections import Counter

url = f"{os.environ['SUPABASE_URL']}/rest/v1/miner_workforce"
headers = {
    "apikey": os.environ['SUPABASE_KEY'],
    "Authorization": f"Bearer {os.environ['SUPABASE_KEY']}",
    "Accept": "application/json",
    "Content-Type": "application/json"
}

resp = requests.get(url, headers=headers, params={"select":"role"})
rows = resp.json()

roles = [r.get("role") for r in rows if isinstance(r, dict) and r.get("role")]
counts = Counter(roles)

plt.bar(list(counts.keys()), list(counts.values()), color="yellow")
plt.title("Miner Workforce Roll")
plt.save_fig("workforce_handout.txt")
plt.show()
