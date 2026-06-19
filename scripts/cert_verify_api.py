#!/usr/bin/env python3
import json
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

OUTPUT_DIR = "public/certificates/output"
PROFILE_DIR = "public/certificates/insurance/profiles"

app = Flask(__name__)
CORS(app)

def load_metadata_by_ins_uuid(ins_uuid):
    meta_path = os.path.join(OUTPUT_DIR, f"{ins_uuid}_metadata.json")
    if not os.path.isfile(meta_path):
        return None
    try:
        with open(meta_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except:
        return None

def load_profile(ins_uuid):
    profile_path = os.path.join(PROFILE_DIR, f"{ins_uuid}.json")
    if not os.path.isfile(profile_path):
        return None
    try:
        with open(profile_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except:
        return None

@app.route("/api/verify", methods=["GET"])
def verify_certificate():
    ins_uuid = request.args.get("ins_uuid")
    serial = request.args.get("serial")
    uuid_ = request.args.get("uuid")

    if not ins_uuid:
        return jsonify({"ok": False, "error": "ins_uuid is required"}), 400

    meta = load_metadata_by_ins_uuid(ins_uuid)
    if not meta:
        return jsonify({"ok": False, "status": "not_found", "reason": "metadata_missing"}), 404

    profile = load_profile(ins_uuid)
    if not profile:
        return jsonify({"ok": False, "status": "not_found", "reason": "profile_missing"}), 404

    checks = []

    if serial:
        checks.append(meta.get("serial") == serial)

    if uuid_:
        checks.append(True)

    sector_meta = (meta.get("sector") or "").lower()
    sector_profile = (profile.get("sector") or "").lower()
    if sector_profile:
        checks.append(sector_meta == sector_profile)

    valid = all(checks) if checks else True

    return jsonify({
        "ok": True,
        "valid": valid,
        "ins_uuid": ins_uuid,
        "serial": meta.get("serial"),
        "sector": meta.get("sector"),
        "issued_at": meta.get("issued_at"),
        "certificate_path": meta.get("certificate_path"),
        "profile": {
            "name": profile.get("name"),
            "status": profile.get("status"),
            "subscription_amount": profile.get("subscription_amount", 0),
            "registered_at": profile.get("registered_at"),
            "sector": profile.get("sector"),
        }
    })

@app.route("/api/certificates", methods=["GET"])
def list_certificates():
    items = []

    for fname in os.listdir(OUTPUT_DIR):
        if not fname.endswith("_metadata.json"):
            continue

        ins_uuid = fname.replace("_metadata.json", "")
        meta = load_metadata_by_ins_uuid(ins_uuid)
        if not meta:
            continue

        profile = load_profile(ins_uuid)

        profile_data = None
        if profile:
            profile_data = {
                "name": profile.get("name"),
                "status": profile.get("status"),
                "subscription_amount": profile.get("subscription_amount", 0),
                "registered_at": profile.get("registered_at"),
                "sector": profile.get("sector"),
            }

        items.append({
            "ins_uuid": ins_uuid,
            "serial": meta.get("serial"),
            "sector": meta.get("sector"),
            "issued_at": meta.get("issued_at"),
            "certificate_path": meta.get("certificate_path"),
            "profile": profile_data,
        })

    return jsonify({
        "ok": True,
        "count": len(items),
        "certificates": items,
    })

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5050, debug=False)
