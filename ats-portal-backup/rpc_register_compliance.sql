create or replace function register_compliance_document(
  stakeholder_id uuid,
  compliance_type text,
  description text,
  pdf_url text,
  ministry text
)
returns uuid
language plpgsql
as $$
declare
  new_id uuid;
begin
  insert into compliance_documents (
    stakeholder_id,
    compliance_type,
    description,
    pdf_url,
    ministry
  )
  values (
    stakeholder_id,
    compliance_type,
    description,
    pdf_url,
    ministry
  )
  returning id into new_id;

  return new_id;
end;
$$;
