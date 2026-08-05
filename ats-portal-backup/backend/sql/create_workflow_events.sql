create table if not exists workflow_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  stakeholder text not null,
  ministry text,
  event_type text not null,
  event_payload jsonb,
  created_at timestamptz default now()
);

alter table workflow_events enable row level security;
