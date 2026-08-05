create or replace function register_mechanisation_request(
  stakeholder_id uuid,
  machine_type text,
  machine_model text,
  serial_number text,
  request_description text,
  quantity int,
  ministry text
)
returns uuid
language plpgsql
as $$
declare
  new_id uuid;
begin
  insert into mechanisation_requests (
    stakeholder_id,
    machine_type,
    machine_model,
    serial_number,
    request_description,
    quantity,
    ministry
  )
  values (
    stakeholder_id,
    machine_type,
    machine_model,
    serial_number,
    request_description,
    quantity,
    ministry
  )
  returning id into new_id;

  return new_id;
end;
$$;
