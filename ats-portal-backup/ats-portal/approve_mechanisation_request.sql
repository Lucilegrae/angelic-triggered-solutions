create or replace function approve_mechanisation_request(
  p_request_id uuid,
  p_ministry text
)
returns void
language plpgsql
as $$
begin
  update mechanisation_requests
  set status = 'approved',
      approved_by = p_ministry,
      approval_timestamp = now()
  where id = p_request_id;
end;
$$;
