#!/bin/bash
# ---------------------------------------------------------
# ATS Federation — Control Panel
# Orchestrates: certificate generation, reports, directory,
# verification portal, ZIP bundles, and server launch.
# ---------------------------------------------------------

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR" || exit 1

GEN_SCRIPT="./generate_sector_certificate.sh"
LEDGER="public/certificates/archives/certificate_ledger.csv"

banner() {
  echo "=================================================="
  echo "        ATS Federation — Control Panel"
  echo "        Root: $ROOT_DIR"
  echo "=================================================="
}

ensure_ledger() {
  if [ ! -f "$LEDGER" ]; then
    echo "Date,Stakeholder,Name,Certificate_File,UUID,Serial_Number,Membership_Number,Sector_Key" > "$LEDGER"
  fi
}

generate_certificate() {
  echo
  echo "🪪 Generate Sector Certificate"
  read -rp "Stakeholder (e.g. community members): " stakeholder
  read -rp "Name (e.g. John Doe): " name

  if [ -z "$stakeholder" ] || [ -z "$name" ]; then
    echo "❌ Stakeholder and Name are required."
    return
  fi

  if [ ! -x "$GEN_SCRIPT" ]; then
    echo "❌ Generator script not executable: $GEN_SCRIPT"
    return
  fi

  "$GEN_SCRIPT" "$stakeholder" "$name"
}

rebuild_reports() {
  echo
  echo "📊 Rebuilding sector reports..."
  ./scripts/generate_all_sector_reports.sh 2>/dev/null || echo "⚠️ Sector report script missing or failed."
}

rebuild_directory() {
  echo
  echo "🌐 Rebuilding membership directory..."
  ./scripts/generate_membership_directory.sh 2>/dev/null || echo "⚠️ Membership directory script missing or failed."
}

rebuild_verification() {
  echo
  echo "🔍 Rebuilding verification portal..."
  ./scripts/ledger_to_json.sh 2>/dev/null || echo "⚠️ Ledger JSON script missing or failed."
  ./scripts/generate_verification_page.sh 2>/dev/null || echo "⚠️ Verification page script missing or failed."
}

full_rebuild() {
  ensure_ledger
  rebuild_reports
  rebuild_directory
  rebuild_verification
  echo
  echo "✅ Full ATS Federation artifacts rebuilt."
}

launch_server() {
  echo
  echo "🌐 Launching local ATS server on port 8080..."
  echo "   Root: public/certificates"
  echo "   Open: http://127.0.0.1:8080/output/"
  echo
  cd "$ROOT_DIR/public/certificates" || exit 1
  python3 -m http.server 8080
}

zip_all() {
  echo
  echo "📦 Creating ZIP of ALL certificates..."
  ./scripts/zip_all_certificates.sh 2>/dev/null || echo "⚠️ zip_all_certificates.sh missing or failed."
}

zip_sector() {
  echo
  echo "📦 Create ZIP for a specific sector"
  read -rp "Enter sector key (e.g. community-members-sector): " sector
  if [ -z "$sector" ]; then
    echo "❌ Sector key required."
    return
  fi
  ./scripts/zip_sector.sh "$sector" 2>/dev/null || echo "⚠️ zip_sector.sh missing or failed."
}

open_downloads() {
  echo
  echo "🔽 Opening Capacitation Downloads page..."
  termux-open-url "http://127.0.0.1:8080/output/capacitation_downloads.html"
}

menu() {
  while true; do
    banner
    echo "1) Generate new sector certificate"
    echo "2) Rebuild sector reports (CSV)"
    echo "3) Rebuild membership directory (HTML)"
    echo "4) Rebuild verification portal (JSON + HTML)"
    echo "5) Full rebuild (reports + directory + verification)"
    echo "6) Launch local ATS server (8080)"
    echo "7) Create ZIP of ALL certificates"
    echo "8) Create ZIP for a specific sector"
    echo "9) Open Capacitation Downloads page"
    echo "0) Exit"
    echo
    read -rp "Select option: " choice

    case "$choice" in
      1) generate_certificate ;;
      2) rebuild_reports ;;
      3) rebuild_directory ;;
      4) rebuild_verification ;;
      5) full_rebuild ;;
      6) launch_server ;;
      7) zip_all ;;
      8) zip_sector ;;
      9) open_downloads ;;
      0) echo "👋 Exiting ATS Control Panel."; break ;;
      *) echo "❌ Invalid choice.";;
    esac

    echo
    read -rp "Press ENTER to continue..." _
  done
}

ensure_ledger
menu
