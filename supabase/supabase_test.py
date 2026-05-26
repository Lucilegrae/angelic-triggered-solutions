import requests, os

url = f"{os.environ['SUPABASE_URL']}/rest/v1/covenant_profiles"
headers = {
    "apikey": os.environ['SUPABASE_KEY'],
    "Authorization": f"Bearer {os.environ['SUPABASE_KEY']}"
}

try:
    resp = requests.get(url, headers=headers, params={"select":"sector"})
    print("Status:", resp.status_code)
    if resp.status_code == 200:
        print("Sample:", resp.json()[:3])
    else:
        print("Error:", resp.text)
except Exception as e:
    print("Connection failed:", e)
