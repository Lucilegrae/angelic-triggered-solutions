from flask import Flask, request, render_template, send_file
import subprocess, uuid, datetime, os

app = Flask(__name__)

# --- Signup Route ---
@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "GET":
        return render_template("signup.html")

    stakeholder = request.form.get("stakeholder", "COMMUNITY")
    user_name = request.form.get("name")

    # Generate UUID and serial number
    cert_uuid = str(uuid.uuid4())
    serial_num = f"SER-{datetime.datetime.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6]}"

    # Call certificate script with parameters
    subprocess.run([
        "bash", "generate_certificate.sh",
        stakeholder, cert_uuid, serial_num, user_name
    ])

    # Return certificate download
    cert_file = f"public/certificates/output/certificate_{stakeholder}.png"
    return send_file(cert_file, as_attachment=True)

# --- Certificate Viewing Route ---
@app.route("/certificates/<stakeholder>")
def view_certificate(stakeholder):
    cert_file = f"public/certificates/output/certificate_{stakeholder}.png"
    return send_file(cert_file, mimetype="image/png")

if __name__ == "__main__":
    # Run Flask on LAN so you can access via 192.168.100.20:8080
    app.run(host="0.0.0.0", port=8080, debug=True)
