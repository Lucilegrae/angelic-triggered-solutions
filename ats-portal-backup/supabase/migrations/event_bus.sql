create table legitimacy_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role text not null,
  stage text not null,
  progress int not null,
  source text not null, -- rpc, webhook, external, system
  payload jsonb not null,
  created_at timestamptz default now()
);

alter table legitimacy_events enable row level security;

create policy "allow_read" on legitimacy_events
for select using (auth.uid() = user_id);
