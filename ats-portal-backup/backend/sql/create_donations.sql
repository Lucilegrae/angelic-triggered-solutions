create table if not exists donations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  stakeholder text not null,
  donation_type text,
  amount numeric,
  payload jsonb,
  created_at timestamptz default now()
);

alter table donations enable row level security;
