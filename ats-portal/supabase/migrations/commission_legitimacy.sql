create or replace function commission_legitimacy(role_name text)
returns void
language plpgsql
security definer
as $$
declare
  uid uuid := auth.uid();
begin
  update legitimacy
  set progress = 100,
      stage = 'commissioned',
      updated_at = now()
  where user_id = uid
    and role = role_name;

  perform net.http_post(
    url := 'https://angelic-triggered-solutions.co.zw/api/legitimacy-notify',
    body := jsonb_build_object('stage', 'commissioned')
  );
end;
$$;
