create or replace function reject_compliance_document(
  p_document_id uuid,
  p_ministry text
)
returns void
language plpgsql
as $$
begin
  update compliance_documents
  set status = 'rejected',
      approved_by = p_ministry,
      approval_timestamp = now()
  where id = p_document_id;
end;
$$;
