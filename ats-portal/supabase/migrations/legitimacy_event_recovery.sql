create or replace function recover_legitimacy_state(uid uuid, event_id uuid)
returns void
language plpgsql
as $$
declare
  rec record;
begin
  -- Fetch archived event
  select *
  into rec
  from legitimacy_event_archive
  where id = event_id
  and user_id = uid;

  if rec is null then
    raise exception 'Archived event not found for user %', uid;
  end if;

  -- Restore legitimacy table to that stage/progress
  update legitimacy
  set stage = rec.stage,
      progress = rec.progress
  where user_id = uid;

  -- Optionally insert a recovery marker into legitimacy_events
  insert into legitimacy_events (user_id, role, stage, progress, source, anomaly)
  values (uid, rec.role, rec.stage, rec.progress, 'recovery', false);
end;
$$;
