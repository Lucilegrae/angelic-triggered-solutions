create or replace function increment_membership(sector text)
returns int as $$
declare
  current_num int;
begin
  update ats_membership_numbers
  set counter = counter + 1
  where sector = increment_membership.sector
  returning counter into current_num;

  return current_num;
end;
$$ language plpgsql security definer;
