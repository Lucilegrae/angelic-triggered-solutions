create or replace function list_compliance_pdfs(p_stakeholder uuid)
returns setof glyph_pdfs
language sql
as $$
  select *
  from glyph_pdfs
  where stakeholder_id = p_stakeholder
  and compliance_type is not null
  order by created_at desc;
$$;
