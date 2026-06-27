import plotly.graph_objects as go
import requests
import os
from dotenv import load_dotenv

# --- Load environment variables ---
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
TABLE_NAME = os.getenv("TABLE_NAME", "legitimacy_flows")

# --- Fetch data from Supabase REST API ---
headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}"
}
response = requests.get(
    f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}?select=day,stakeholder_role,legitimacy_value",
    headers=headers
)

# Debug: print response if something goes wrong
print("Status:", response.status_code)
if response.status_code != 200:
    print("Error:", response.text)

data = response.json()

# --- Organize data ---
days = [row["day"] for row in data]
roles = [row["stakeholder_role"] for row in data]
legitimacy = [float(row["legitimacy_value"]) for row in data]

# --- Line Chart: Growth over time (cumulative per role) ---
fig_line = go.Figure()
for role in set(roles):
    x_vals = [d for d, r in zip(days, roles) if r == role]
    y_vals = []
    running_total = 0
    for l in [l for l, r in zip(legitimacy, roles) if r == role]:
        running_total += l
        y_vals.append(running_total)
    fig_line.add_trace(go.Scatter(x=x_vals, y=y_vals,
                                  mode="lines+markers", name=role))
fig_line.update_layout(title="Cumulative Legitimacy Growth by Stakeholder Role",
                       xaxis_title="Day", yaxis_title="Cumulative Legitimacy")

# --- Bar Chart: Snapshot comparison (latest totals) ---
snapshot_roles = list(set(roles))
snapshot_values = []
for role in snapshot_roles:
    role_values = [l for l, r in zip(legitimacy, roles) if r == role]
    snapshot_values.append(sum(role_values))

fig_bar = go.Figure(data=[
    go.Bar(name="Total Legitimacy", x=snapshot_roles, y=snapshot_values)
])
fig_bar.update_layout(barmode="group", title="Legitimacy Strength Snapshot")

# --- Save charts as HTML files ---
fig_line.write_html("line_chart.html")
fig_bar.write_html("bar_chart.html")
