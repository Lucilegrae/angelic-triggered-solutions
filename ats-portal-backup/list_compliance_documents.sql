create or replace function list_compliance_documents()
returns setof compliance_documents
language sql
as $$
  select *
  from compliance_documents
  order by created_at desc;
$$;
