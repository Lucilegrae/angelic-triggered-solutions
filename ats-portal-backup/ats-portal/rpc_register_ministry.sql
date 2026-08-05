create or replace function register_ministry(
  name text,
  code text,
  ministry_type text,
  officer_name text,
  officer_email text,
  officer_phone text
)
returns uuid
language plpgsql
as $$
declare
  new_id uuid;
begin
  insert into ministries (
    name,
    code,
    ministry_type,
    officer_name,
    officer_email,
    officer_phone
  )
  values (
    name,
    code,
    ministry_type,
    officer_name,
    officer_email,
    officer_phone
  )
  returning id into new_id;

  return new_id;
end;
$$;
