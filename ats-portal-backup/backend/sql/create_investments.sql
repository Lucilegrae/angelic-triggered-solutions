create table if not exists investments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  stakeholder text not null,
  investment_type text,
  amount numeric,
  payload jsonb,
  created_at timestamptz default now()
);

alter table investments enable row level security;
