#!/usr/bin/env python3
import argparse
from PIL import Image, ImageDraw, ImageFont
import qrcode
import os

# ---------------------------------------------------------
# Load arguments
# ---------------------------------------------------------
parser = argparse.ArgumentParser()
parser.add_argument("--template", required=True)
parser.add_argument("--name", required=True)
parser.add_argument("--sector", required=True)
parser.add_argument("--serial", required=True)
parser.add_argument("--uuid", required=True)
parser.add_argument("--ins", required=True)
parser.add_argument("--date", required=True)
parser.add_argument("--output", required=True)
args = parser.parse_args()

TEMPLATE_PATH = args.template
OUTPUT_PATH = args.output

NAME = args.name
SECTOR = args.sector
SERIAL = args.serial
UUID = args.uuid
INS_UUID = args.ins
DATE = args.date

# ---------------------------------------------------------
# Load template
# ---------------------------------------------------------
# TEMPLATE_PATH contains: base|crest
base_path, crest_path = TEMPLATE_PATH.split("|")

base = Image.open(base_path).convert("RGBA")
crest = Image.open(crest_path).convert("RGBA")

# Paste crest onto base (adjust coordinates)
base.paste(crest, (300, 300), crest)

# ---------------------------------------------------------
# Fonts (fallback if system fonts missing)
# ---------------------------------------------------------
FONT_LARGE = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 72)
FONT_MEDIUM = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 48)
FONT_SMALL = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 36)

# ---------------------------------------------------------
# Text placement (adjust coordinates to match your template)
# ---------------------------------------------------------
draw.text((800, 600), NAME, font=FONT_LARGE, fill="black")
draw.text((800, 700), f"Sector: {SECTOR}", font=FONT_MEDIUM, fill="black")
draw.text((800, 780), f"Serial: {SERIAL}", font=FONT_MEDIUM, fill="black")
draw.text((800, 860), f"UUID: {UUID}", font=FONT_MEDIUM, fill="black")
draw.text((800, 940), f"Insignia: {INS_UUID}", font=FONT_MEDIUM, fill="black")
draw.text((800, 1020), f"Date: {DATE}", font=FONT_MEDIUM, fill="black")

# ---------------------------------------------------------
# QR Code generation
# ---------------------------------------------------------
def make_qr(data):
    qr = qrcode.QRCode(box_size=10, border=2)
    qr.add_data(data)
    qr.make(fit=True)
    return qr.make_image(fill_color="black", back_color="white").convert("RGBA")

QR_LEFT = make_qr(f"{UUID}|{SERIAL}|{SECTOR}")
QR_RIGHT = make_qr(f"{INS_UUID}|{NAME}|{DATE}")

# ---------------------------------------------------------
# Paste QR codes (adjust coordinates to match your template)
# ---------------------------------------------------------
base.paste(QR_LEFT, (300, 1400), QR_LEFT)
base.paste(QR_RIGHT, (1600, 1400), QR_RIGHT)

# ---------------------------------------------------------
# Save final certificate
# ---------------------------------------------------------
os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
base.save(OUTPUT_PATH)

print(f"✅ Certificate rendered: {OUTPUT_PATH}")
