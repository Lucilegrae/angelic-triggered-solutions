create table if not exists funding_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  stakeholder text not null,
  request_type text,
  amount numeric,
  payload jsonb,
  created_at timestamptz default now()
);

alter table funding_requests enable row level security;
