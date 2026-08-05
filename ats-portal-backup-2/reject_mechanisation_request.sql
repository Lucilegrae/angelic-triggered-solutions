create or replace function reject_mechanisation_request(
  p_request_id uuid,
  p_ministry text
)
returns void
language plpgsql
as $$
begin
  update mechanisation_requests
  set status = 'rejected',
      approved_by = p_ministry,
      approval_timestamp = now()
  where id = p_request_id;
end;
$$;
