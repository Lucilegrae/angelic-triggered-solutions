create table if not exists insurance_claims (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  stakeholder text not null,
  claim_type text,
  claim_amount numeric,
  payload jsonb,
  created_at timestamptz default now()
);

alter table insurance_claims enable row level security;
