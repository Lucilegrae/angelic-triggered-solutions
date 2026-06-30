create or replace function compute_legitimacy_score(uid uuid)
returns numeric
language plpgsql
as $$
declare
  role_weight numeric;
  stage_score numeric;
  activity_score numeric;
  consistency_score numeric;
  audit_count int;
  last_event timestamptz;
  days_since int;
begin
  -- Role weight
  select case role
    when 'government' then 1.0
    when 'banks' then 0.9
    when 'investors' then 0.85
    when 'suppliers' then 0.8
    when 'transporters' then 0.75
    when 'miners' then 0.7
    when 'community_members' then 0.6
    when 'donors' then 0.5
  end
  into role_weight
  from legitimacy
  where user_id = uid
  limit 1;

  -- Stage score
  select case stage
    when 'initiated' then 0.25
    when 'verified' then 0.50
    when 'sanctified' then 0.75
    when 'commissioned' then 1.00
  end
  into stage_score
  from legitimacy
  where user_id = uid
  limit 1;

  -- Activity score
  select count(*) into audit_count
  from legitimacy_audit
  where user_id = uid;

  activity_score := ln(1 + audit_count) / 5;

  -- Consistency score
  select max(timestamp) into last_event
  from legitimacy_audit
  where user_id = uid;

  days_since := extract(day from now() - last_event);

  consistency_score := greatest(0, 1 - (days_since / 90.0));

  return (
    (0.40 * role_weight) +
    (0.30 * stage_score) +
    (0.20 * activity_score) +
    (0.10 * consistency_score)
  ) * 100;
end;
$$;
