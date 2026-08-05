#!/bin/bash

curl -X POST \
  "${SUPABASE_URL}/rest/v1/rpc" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "create or replace function increment_membership(sector text) returns int as $$ declare current_num int; begin update ats_membership_numbers set counter = counter + 1 where sector = increment_membership.sector returning counter into current_num; return current_num; end; $$ language plpgsql security definer;"
  }'
