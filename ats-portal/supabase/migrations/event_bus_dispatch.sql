create or replace function dispatch_legitimacy_event(
  new_stage text,
  new_progress int,
  role text,
  source text
)
returns void
language plpgsql
security definer
as $$
declare
  uid uuid := auth.uid();
begin
  insert into legitimacy_events (user_id, role, stage, progress, source, payload)
  values (
    uid,
    role,
    new_stage,
    new_progress,
    source,
    jsonb_build_object(
      'stage', new_stage,
      'progress', new_progress,
      'role', role,
      'timestamp', now()
    )
  );
end;
$$;
