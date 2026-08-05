create or replace function update_ministry_status(
  ministry_id uuid,
  new_status text
)
returns void
language plpgsql
as $$
begin
  update ministries
  set status = new_status
  where id = ministry_id;
end;
$$;
