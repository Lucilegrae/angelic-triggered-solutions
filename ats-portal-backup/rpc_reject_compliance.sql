create or replace function reject_compliance_document(
  document_id uuid,
  officer text,
  notes text
)
returns void
language plpgsql
as $$
begin
  update compliance_documents
  set status = 'rejected',
      approved_by = officer,
      approval_notes = notes
  where id = document_id;
end;
$$;
