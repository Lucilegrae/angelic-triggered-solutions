create or replace function legitimacy_event_timeline(uid uuid)
returns table (
  id uuid,
  stage text,
  progress int,
  source text,
  anomaly boolean,
  created_at timestamptz
)
language sql
as $$
  select
    id,
    stage,
    progress,
    source,
    anomaly,
    created_at
  from legitimacy_event_archive
  where user_id = uid
  order by created_at asc;
$$;
