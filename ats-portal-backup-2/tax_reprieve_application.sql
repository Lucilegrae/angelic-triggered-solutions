create or replace function submit_tax_reprieve_application(
  p_pdf_id uuid
)
returns void
language plpgsql
as $$
begin
  update glyph_pdfs
  set application_status = 'submitted',
      tags = array_append(tags, 'tax_reprieve')
  where id = p_pdf_id;
end;
$$;
