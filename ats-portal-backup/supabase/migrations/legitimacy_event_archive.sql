create table legitimacy_event_archive (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role text not null,
  stage text not null,
  progress int not null,
  source text not null, -- rpc, mou, webhook, anomaly, prediction
  anomaly boolean default false,
  created_at timestamptz default now()
);

alter table legitimacy_event_archive enable row level security;

create policy "user_can_read_archive" on legitimacy_event_archive
for select using (auth.uid() = user_id);
