#!/data/data/com.termux/files/usr/bin/bash

CONFIG="ats-portal/supabase/config.toml"

PROJECT_URL=$(grep api_url $CONFIG | cut -d '"' -f2)
SERVICE_ROLE_KEY=$(grep service_role_key $CONFIG | cut -d '"' -f2)

SQL_FILE="$1"

if [ -z "$SQL_FILE" ]; then
  echo "Usage: ./run_sql.sh <sql-file>"
  exit 1
fi

# Base64 encode SQL safely
SQL_BASE64=$(base64 -w 0 "$SQL_FILE")

curl -X POST \
  "$PROJECT_URL/rest/v1/rpc/execute_sql_base64" \
  -H "apikey: $SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"sql_base64\": \"$SQL_BASE64\"}"
