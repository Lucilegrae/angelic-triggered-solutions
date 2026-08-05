create or replace function reject_mechanisation_request(
  request_id uuid,
  officer text,
  notes text
)
returns void
language plpgsql
as $$
begin
  update mechanisation_requests
  set status = 'rejected',
      approved_by = officer,
      approval_notes = notes
  where id = request_id;
end;
$$;
