import requests, os, plotext as plt
from collections import Counter

url = f"{os.environ['SUPABASE_URL']}/rest/v1/covenant_profiles"
headers = {
    "apikey": os.environ['SUPABASE_KEY'],
    "Authorization": f"Bearer {os.environ['SUPABASE_KEY']}"
}

resp = requests.get(url, headers=headers, params={"select":"sector"})
rows = resp.json()

# Filter out None or missing values
sectors = [r.get("sector") for r in rows if r.get("sector") is not None]
counts = Counter(sectors)

x = list(counts.keys())
y = list(counts.values())

plt.bar(x, y, color="yellow")
plt.title("Phoenix Rising: Sector Counts")
plt.save_fig("sector_handout.txt")
plt.show()
