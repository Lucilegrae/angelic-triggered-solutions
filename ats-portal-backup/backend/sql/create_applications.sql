create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  stakeholder text not null,
  ministry text,
  application_type text not null,
  payload jsonb,
  created_at timestamptz default now()
);

alter table applications enable row level security;
