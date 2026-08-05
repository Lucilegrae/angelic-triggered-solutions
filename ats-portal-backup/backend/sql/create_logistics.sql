create table if not exists logistics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  stakeholder text not null,
  ministry text,
  cargo_type text,
  cargo_weight numeric,
  route jsonb,
  payload jsonb,
  created_at timestamptz default now()
);

alter table logistics enable row level security;
