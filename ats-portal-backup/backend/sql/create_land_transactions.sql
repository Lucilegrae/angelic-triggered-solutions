create table if not exists land_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  stakeholder text not null,
  ministry text,
  land_size numeric,
  land_location text,
  transaction_type text,
  payload jsonb,
  created_at timestamptz default now()
);

alter table land_transactions enable row level security;
