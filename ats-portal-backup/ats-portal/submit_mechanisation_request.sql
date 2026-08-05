create or replace function submit_mechanisation_request(
  p_stakeholder uuid,
  p_request_type text,
  p_description text
)
returns void
language plpgsql
as $$
begin
  insert into mechanisation_requests (stakeholder_id, request_type, description)
  values (p_stakeholder, p_request_type, p_description);
end;
$$;
