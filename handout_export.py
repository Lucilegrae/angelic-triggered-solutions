import pdfkit
import datetime
import os
from PyPDF2 import PdfMerger

# Ensure archives directory exists
os.makedirs("archives", exist_ok=True)

# Timestamp for file naming
today = datetime.date.today().strftime("%B_%Y")

# Generate individual PDFs
cover_pdf = f"archives/cover_{today}.pdf"
monthly_pdf = f"archives/monthly_legitimacy_{today}.pdf"
weekly_pdf = f"archives/weekly_audit_{today}.pdf"
merged_pdf = f"archives/ceremonial_scroll_{today}.pdf"

pdfkit.from_file("templates/cover_page.html", cover_pdf)
pdfkit.from_file("templates/golden_handout.html", monthly_pdf)
pdfkit.from_file("templates/weekly_audit.html", weekly_pdf)

# Merge into one ceremonial scroll
merger = PdfMerger()
for pdf in [cover_pdf, monthly_pdf, weekly_pdf]:
    merger.append(pdf)

merger.write(merged_pdf)
merger.close()

print(f"✅ Ceremonial scroll generated: {merged_pdf}")
