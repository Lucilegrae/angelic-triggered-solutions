create or replace function approve_compliance_document(
  document_id uuid,
  officer text,
  notes text
)
returns void
language plpgsql
as $$
begin
  update compliance_documents
  set status = 'approved',
      approved_by = officer,
      approval_notes = notes
  where id = document_id;
end;
$$;
