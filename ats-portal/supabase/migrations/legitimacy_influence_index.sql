create or replace function compute_legitimacy_influence_index(uid uuid)
returns numeric
language plpgsql
as $$
declare
  event_impact numeric;
  role_weight numeric;
  consistency numeric;
  trust numeric;
  propagation numeric;
  anomaly numeric;
  influence numeric;
  role text;
begin
  -- Role weight
  select role into role
  from legitimacy
  where user_id = uid;

  role_weight := case
    when role = 'government' then 100
    when role = 'bank' then 85
    when role = 'investor' then 80
    when role = 'supplier' then 70
    when role = 'transporter' then 65
    when role = 'miner' then 60
    when role = 'community' then 50
    else 40
  end;

  -- Event impact: number of events in last 30 days
  select least(100, count(*) * 2)
  into event_impact
  from legitimacy_events
  where user_id = uid
  and created_at > now() - interval '30 days';

  -- Consistency
  select compute_legitimacy_consistency(uid)
  into consistency;

  -- Trust
  select compute_legitimacy_trust_index(uid)
  into trust;

  -- Propagation: number of federation events triggered after this user's events
  select least(100, count(*) * 3)
  into propagation
  from legitimacy_events e1
  join legitimacy_events e2
    on e2.created_at > e1.created_at
   and e2.created_at < e1.created_at + interval '10 minutes'
  where e1.user_id = uid;

  -- Anomaly penalty
  select case
    when detect_legitimacy_anomaly(uid)->>'is_anomaly' = 'true' then 100
    else 0
  end
  into anomaly;

  -- Influence formula
  influence :=
    (0.25 * event_impact) +
    (0.20 * role_weight) +
    (0.20 * consistency) +
    (0.20 * trust) +
    (0.10 * propagation) +
    (0.05 * (100 - anomaly));

  return greatest(0, least(100, influence));
end;
$$;
