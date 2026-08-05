create or replace function approve_mechanisation_request(
  request_id uuid,
  officer text,
  notes text
)
returns void
language plpgsql
as $$
begin
  update mechanisation_requests
  set status = 'approved',
      approved_by = officer,
      approval_notes = notes
  where id = request_id;
end;
$$;
