create or replace function update_onboarding_status(
  stakeholder_id uuid,
  new_status text
)
returns void
language plpgsql
as $$
begin
  update stakeholders
  set onboarding_status = new_status
  where id = stakeholder_id;
end;
$$;
