create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  stakeholder text not null,
  ministry text,
  project_name text not null,
  project_status text,
  payload jsonb,
  created_at timestamptz default now()
);

alter table projects enable row level security;
