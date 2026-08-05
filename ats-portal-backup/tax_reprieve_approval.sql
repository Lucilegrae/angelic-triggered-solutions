create or replace function approve_tax_reprieve(
  p_pdf_id uuid,
  p_ministry text
)
returns void
language plpgsql
as $$
begin
  update glyph_pdfs
  set approval_status = 'approved',
      approved_by = p_ministry,
      approval_timestamp = now()
  where id = p_pdf_id;
end;
$$;
