create or replace function emit_workflow_event(
  p_event_type text,
  p_event_payload jsonb
)
returns void
language plpgsql
security definer
as $$
declare
  v_ministry_id uuid;
begin
  -- Resolve ministry_id from JWT ministry name
  select id into v_ministry_id
  from ministries
  where name = auth.jwt()->>'ministry';

  insert into workflow_events (
    user_id,
    stakeholder,
    ministry,
    ministry_id,
    event_type,
    event_payload
  )
  values (
    auth.uid(),
    auth.jwt()->>'stakeholder',
    auth.jwt()->>'ministry',
    v_ministry_id,
    p_event_type,
    p_event_payload
  );
end;
$$;
