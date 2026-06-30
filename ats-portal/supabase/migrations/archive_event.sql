create or replace function archive_legitimacy_event(
  uid uuid,
  role text,
  stage text,
  progress int,
  source text,
  anomaly boolean default false
)
returns void
language plpgsql
as $$
begin
  insert into legitimacy_event_archive (
    user_id, role, stage, progress, source, anomaly
  )
  values (uid, role, stage, progress, source, anomaly);
end;
$$;
