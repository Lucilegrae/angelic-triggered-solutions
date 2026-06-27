#!/usr/bin/env python3
import os
import subprocess

output_dir = "public/certificates/output"
certificates = [f for f in os.listdir(output_dir) if f.endswith(".png")]

if not certificates:
    print("❌ No certificates found in output directory.")
else:
    print(f"✨ Found {len(certificates)} certificates.")
    for cert in certificates:
        cert_path = os.path.join(output_dir, cert)
        print(f"📜 Opening {cert_path}...")
        subprocess.run(["xdg-open", cert_path])
