#!/usr/bin/env python3
from flask import Flask, render_template_string, send_from_directory
import csv, os

app = Flask(__name__)

OUTPUT_DIR = "public/certificates/output"
LEDGER = "public/certificates/archives/certificate_ledger.csv"

@app.route("/")
def index():
    certificates = []
    if os.path.exists(LEDGER):
        with open(LEDGER, newline="") as f:
            reader = csv.DictReader(f)
            for row in reader:
                certificates.append(row)

    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Sanctified Certificates</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f9f9f9; }
            h1 { text-align: center; color: #444; }
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 20px; }
            .card { background: white; border: 2px solid gold; padding: 10px; text-align: center; }
            .card img { max-width: 100%; border: 1px solid #ccc; }
            .download { display: inline-block; margin-top: 10px; padding: 6px 12px; background: #007BFF; color: white; text-decoration: none; border-radius: 4px; }
            .download:hover { background: #0056b3; }
        </style>
    </head>
    <body>
        <h1>Sanctified Certificates</h1>
        <div class="grid">
            {% for cert in certificates %}
            <div class="card">
                <img src="/output/{{ cert['Certificate_File'].split('/')[-1] }}" alt="{{ cert['Stakeholder'] }}">
                <h3>{{ cert['Stakeholder'] }}</h3>
                <p>UUID: {{ cert['UUID'] }}</p>
                <p>Policy: {{ cert['Policy_Number'] }}</p>
                <a class="download" href="/output/{{ cert['Certificate_File'].split('/')[-1] }}" download>Download</a>
            </div>
            {% endfor %}
        </div>
    </body>
    </html>
    """
    return render_template_string(html, certificates=certificates)

@app.route("/output/<path:filename>")
def serve_file(filename):
    return send_from_directory(OUTPUT_DIR, filename)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
