import os, requests, plotext as plt, zipfile, smtplib
from collections import Counter
from datetime import datetime, timedelta
from email.message import EmailMessage

# === Supabase Headers ===
headers = {
    "apikey": os.environ['SUPABASE_KEY'],
    "Authorization": f"Bearer {os.environ['SUPABASE_KEY']}",
    "Accept": "application/json",
    "Content-Type": "application/json"
}

project_dir = os.path.dirname(os.path.abspath(__file__))

def brand_handout(filename, header, footer):
    filepath = os.path.join(project_dir, filename)
    with open(filepath, "r+") as f:
        content = f.read()
        f.seek(0, 0)
        f.write(header + "\n\n" + content + "\n" + footer + "\n")

# === Chart + Branding Steps ===
# (sector, pledges, workforce, rollcall handouts as before...)

# === Archive Step ===
archives_dir = os.path.join(project_dir, "archives")
os.makedirs(archives_dir, exist_ok=True)

timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M")
archive_name = os.path.join(archives_dir, f"phoenix_rising_handouts_{timestamp}.zip")

with zipfile.ZipFile(archive_name, "w") as zf:
    # add handouts...
    pass

print(f"✨ Archive stored at {archive_name}, handouts cleaned up ✨")

# === Email Distribution ===
stakeholders_file = os.path.join(project_dir, "stakeholders.txt")
if os.path.exists(stakeholders_file):
    with open(stakeholders_file) as sf:
        recipients = [line.strip() for line in sf if line.strip()]
else:
    recipients = ["pnovontony@yahoo.com"]

# Phoenix crest + Rising Flame footer
crest = (
    "        \\   ^   /\n"
    "         \\  |  /\n"
    "          \\ | /\n"
    "       ---  ✨  ---\n"
    "          / | \\\n"
    "         /  |  \\\n"
    "        /   v   \\\n"
    "   ════════════════════════\n"
    "        ✨ Phoenix Rising ✨\n"
    "   ════════════════════════\n"
)

footer = (
    "      (   )\n"
    "     (     )\n"
    "    (       )\n"
    "     \\     /\n"
    "      \\   /\n"
    "       \\ /\n"
    "        V\n"
    "   ════════════════════════\n"
    "       ✨ Rising Flame ✨\n"
    "   ════════════════════════"
)

msg = EmailMessage()
msg["Subject"] = "Phoenix Rising Ceremonial Handouts"
msg["From"] = "pnovontony@yahoo.com"
msg["To"] = ", ".join(recipients)
msg.set_content(
    crest + "\n\n"
    "Beloved Covenant Council,\n\n"
    "Attached is the latest Phoenix Rising ceremonial archive, "
    "timestamped for covenant distribution.\n\n"
    "This scroll carries the unity of our sectors, pledges, workforce, "
    "and roll‑call timeline.\n\n" + footer
)

with open(archive_name, "rb") as f:
    msg.add_attachment(f.read(),
                       maintype="application",
                       subtype="zip",
                       filename=os.path.basename(archive_name))

with smtplib.SMTP_SSL("smtp.mail.yahoo.com", 465) as server:
    server.login("pnovontony@yahoo.com", "qtacomwncgawgmtu")
    server.send_message(msg)

print("✨ Ceremonial archive emailed to stakeholders ✨")

# === Monthly Log Rotation + Yearly Compression ===
# (same as before, but annual_msg also uses crest + footer)

annual_msg = EmailMessage()
annual_msg["Subject"] = f"Phoenix Rising Annual Scroll {prev_year_tag}"
annual_msg["From"] = "pnovontony@yahoo.com"
annual_msg["To"] = ", ".join(recipients)
annual_msg["Bcc"] = "pnovontony@yahoo.com"
annual_msg.set_content(
    crest + "\n\n"
    "Beloved Covenant Council,\n\n"
    f"Attached is the full ceremonial distribution log archive for {prev_year_tag}.\n\n"
    "This annual scroll preserves the covenant record of our unity, "
    "pledges, and roll‑call across the year.\n\n" + footer
)
