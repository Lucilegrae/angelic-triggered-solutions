import os, datetime as dt, requests, plotly.express as px
from dotenv import load_dotenv

load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
TABLE_NAME = os.getenv("TABLE_NAME", "legitimacy_flows")
BUCKET = "charts"

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}"
}

def fetch_data():
    url = f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}?select=*"
    r = requests.get(url, headers=headers)
    r.raise_for_status()
    return r.json()

def upload_chart(fig, filename):
    html = fig.to_html(include_plotlyjs="cdn")
    storage_url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET}/{filename}"
    r = requests.put(
        storage_url,
        headers={
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "apikey": SUPABASE_KEY,
            "Content-Type": "text/html"
        },
        data=html.encode("utf-8")
    )
    print("Uploaded:", filename, r.status_code)

def insert_dashboard_link(cadence, filename):
    chart_url = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET}/{filename}"
    payload = {"cadence": cadence, "chart_url": chart_url}
    r = requests.post(
        f"{SUPABASE_URL}/rest/v1/dashboard_links",
        headers={
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "apikey": SUPABASE_KEY,
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
        },
        json=payload
    )
    print("Inserted link:", cadence, r.status_code)

def notify_stakeholders(cadence, filename):
    chart_url = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET}/{filename}"
    webhook_url = os.getenv("STAKEHOLDER_WEBHOOK")

    cadence_colors = {
        "daily": "#1E90FF",     # blue
        "weekly": "#32CD32",    # green
        "monthly": "#FF69B4",   # pink
        "quarterly": "#FFD700", # gold
        "yearly": "#8A2BE2"     # violet
    }
    color = cadence_colors.get(cadence.lower(), "#2C2D30")

    message = {
        "attachments": [
            {
                "color": color,
                "blocks": [
                    {
                        "type": "header",
                        "text": {
                            "type": "plain_text",
                            "text": f"✨ {cadence.capitalize()} Legitimacy Report ✨",
                            "emoji": True
                        }
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": f"*{cadence.capitalize()} cadence chart uploaded!* 📊\n\nStakeholders can view the legitimacy snapshot here:"
                        }
                    },
                    {
                        "type": "actions",
                        "elements": [
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "🔗 View Chart"
                                },
                                "url": chart_url,
                                "style": "primary"
                            }
                        ]
                    },
                    {
                        "type": "context",
                        "elements": [
                            {
                                "type": "mrkdwn",
                                "text": "Ritualized legitimacy flow anchored via Supabase + GitHub Actions"
                            }
                        ]
                    }
                ]
            }
        ]
    }

    if webhook_url:
        r = requests.post(webhook_url, json=message)
        print("Notification sent:", cadence, r.status_code)
    else:
        print("No webhook configured.")

def run_monthly():
    data = fetch_data()
    today = dt.date.today()
    monthly = [row for row in data if dt.date.fromisoformat(row["timestamp"][:10]).month == today.month]
    if not monthly:
        print("No monthly data.")
        return
    fig = px.line(monthly, x="timestamp", y="kpi_value", color="role",
                  title="Monthly Legitimacy Snapshot", template="plotly_dark")
    filename = "monthly_legitimacy.html"
    upload_chart(fig, filename)
    insert_dashboard_link("monthly", filename)
    notify_stakeholders("monthly", filename)

if __name__ == "__main__":
    main()
