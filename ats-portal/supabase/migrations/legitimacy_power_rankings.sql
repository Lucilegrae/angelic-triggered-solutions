create or replace function compute_legitimacy_power(uid uuid)
returns numeric
language plpgsql
as $$
declare
  influence numeric;
  trust numeric;
  consistency numeric;
  activity numeric;
  power numeric;
begin
  -- Influence
  select compute_legitimacy_influence_index(uid)
  into influence;

  -- Trust
  select compute_legitimacy_trust_index(uid)
  into trust;

  -- Consistency
  select compute_legitimacy_consistency(uid)
  into consistency;

  -- Activity (events in last 30 days)
  select least(100, count(*) * 2)
  into activity
  from legitimacy_events
  where user_id = uid
  and created_at > now() - interval '30 days';

  -- Power formula
  power :=
    (0.35 * influence) +
    (0.30 * trust) +
    (0.20 * consistency) +
    (0.15 * activity);

  return greatest(0, least(100, power));
end;
$$;

-- Leaderboard function
create or replace function legitimacy_power_rankings()
returns table (
  user_id uuid,
  role text,
  power numeric
)
language sql
as $$
  select
    l.user_id,
    l.role,
    compute_legitimacy_power(l.user_id) as power
  from legitimacy l
  order by power desc;
$$;
