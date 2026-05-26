import requests, os, plotext as plt

url = f"{os.environ['SUPABASE_URL']}/rest/v1/pledges"
headers = {
    "apikey": os.environ['SUPABASE_KEY'],
    "Authorization": f"Bearer {os.environ['SUPABASE_KEY']}",
    "Accept": "application/json",
    "Content-Type": "application/json"
}

resp = requests.get(url, headers=headers, params={"select":"community,pledge_amount"})
rows = resp.json()

totals = {}
for r in rows:
    if isinstance(r, dict):
        community = r.get("community")
        pledge = r.get("pledge_amount")
        if community and pledge is not None:
            totals[community] = totals.get(community, 0) + pledge

x = list(totals.keys())
y = list(totals.values())

plt.bar(x, y, orientation="horizontal", color="yellow")
plt.title("Community Pledges")
plt.save_fig("pledges_handout.txt")
plt.show()
