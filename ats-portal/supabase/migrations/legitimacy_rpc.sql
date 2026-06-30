create or replace function advance_legitimacy(new_stage text)
returns void
language plpgsql
security definer
as $$
declare
  uid uuid := auth.uid();
  new_progress int;
  role text;
begin
  -- Fetch role
  select legitimacy.role into role
  from legitimacy
  where user_id = uid;

  -- Determine progress
  if new_stage = 'initiated' then
    new_progress := 25;
  elsif new_stage = 'verified' then
    new_progress := 50;
  elsif new_stage = 'sanctified' then
    new_progress := 75;
  elsif new_stage = 'commissioned' then
    new_progress := 100;
  else
    raise exception 'Invalid legitimacy stage: %', new_stage;
  end if;

  -- Update legitimacy table
  update legitimacy
  set progress = new_progress,
      stage = new_stage,
      updated_at = now()
  where user_id = uid;

  -- Audit log entry
  insert into legitimacy_audit (user_id, role, stage, progress, action)
  values (uid, role, new_stage, new_progress, 'rpc_advance');

  -- External webhook broadcast
  perform net.http_post(
    url := 'https://angelic-triggered-solutions.co.zw/api/legitimacy-webhook',
    body := jsonb_build_object(
      'stage', new_stage,
      'role', role,
      'progress', new_progress
    )
  );

  -- Global legitimacy event bus dispatch
  perform dispatch_legitimacy_event(
    new_stage,
    new_progress,
    role,
    'rpc'
  );

end;
$$;
