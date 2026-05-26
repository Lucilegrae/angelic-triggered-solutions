import os, requests, plotext as plt
from collections import Counter

headers = {
    "apikey": os.environ['SUPABASE_KEY'],
    "Authorization": f"Bearer {os.environ['SUPABASE_KEY']}",
    "Accept": "application/json",
    "Content-Type": "application/json"
}

# 1. Sector Chart
resp = requests.get(f"{os.environ['SUPABASE_URL']}/rest/v1/covenant_profiles",
                    headers=headers, params={"select":"sector"})
rows = resp.json()
sectors = [r.get("sector") for r in rows if isinstance(r, dict) and r.get("sector")]
counts = Counter(sectors)
plt.bar(list(counts.keys()), list(counts.values()), color="yellow")
plt.title("Phoenix Rising: Sector Counts")
plt.save_fig("sector_handout.txt")
plt.clear_figure()

# 2. Pledges Chart
resp = requests.get(f"{os.environ['SUPABASE_URL']}/rest/v1/pledges",
                    headers=headers, params={"select":"community,pledge_amount"})
rows = resp.json()
totals = {}
for r in rows:
    if isinstance(r, dict):
        c, p = r.get("community"), r.get("pledge_amount")
        if c and p is not None:
            totals[c] = totals.get(c, 0) + p
plt.bar(list(totals.keys()), list(totals.values()), orientation="horizontal", color="yellow")
plt.title("Community Pledges")
plt.save_fig("pledges_handout.txt")
plt.clear_figure()

# 3. Workforce Chart
resp = requests.get(f"{os.environ['SUPABASE_URL']}/rest/v1/miner_workforce",
                    headers=headers, params={"select":"role"})
rows = resp.json()
roles = [r.get("role") for r in rows if isinstance(r, dict) and r.get("role")]
counts = Counter(roles)
plt.bar(list(counts.keys()), list(counts.values()), color="yellow")
plt.title("Miner Workforce Roll")
plt.save_fig("workforce_handout.txt")
plt.clear_figure()

# 4. Roll‑Call Timeline
resp = requests.get(f"{os.environ['SUPABASE_URL']}/rest/v1/rollcall",
                    headers=headers, params={"select":"day,attendance", "order":"day.asc"})
rows = resp.json()
days = [r.get("day") for r in rows if isinstance(r, dict) and r.get("day")]
attendance = [r.get("attendance") for r in rows if isinstance(r, dict) and r.get("attendance") is not None]
plt.plot(days, attendance, marker="dot", color="yellow")
plt.title("Roll‑Call Timeline")
plt.save_fig("rollcall_handout.txt")
plt.clear_figure()

print("✨ Ceremonial export complete: sector_handout.txt, pledges_handout.txt, workforce_handout.txt, rollcall_handout.txt")
