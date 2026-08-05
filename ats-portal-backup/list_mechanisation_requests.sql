create or replace function list_mechanisation_requests()
returns setof mechanisation_requests
language sql
as $$
  select *
  from mechanisation_requests
  order by created_at desc;
$$;
