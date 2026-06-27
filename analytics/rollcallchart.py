import requests, os, plotext as plt

url = f"{os.environ['SUPABASE_URL']}/rest/v1/rollcall"
headers = {
    "apikey": os.environ['SUPABASE_KEY'],
    "Authorization": f"Bearer {os.environ['SUPABASE_KEY']}",
    "Accept": "application/json",
    "Content-Type": "application/json"
}

resp = requests.get(url, headers=headers, params={"select":"day,attendance", "order":"day.asc"})
rows = resp.json()

days = [r.get("day") for r in rows if isinstance(r, dict) and r.get("day")]
attendance = [r.get("attendance") for r in rows if isinstance(r, dict) and r.get("attendance") is not None]

plt.plot(days, attendance, marker="dot", color="yellow")
plt.title("Roll‑Call Timeline")
plt.save_fig("rollcall_handout.txt")
plt.show()
