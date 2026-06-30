create or replace function compute_legitimacy_alignment_index(uid uuid)
returns numeric
language plpgsql
as $$
declare
  stage_alignment numeric;
  role_alignment numeric;
  historical_alignment numeric;
  prediction_alignment numeric;
  trust numeric;
  consistency numeric;
  anomaly numeric;
  alignment numeric;
  role text;
  stage text;
begin
  -- Fetch role + stage
  select role, stage into role, stage
  from legitimacy
  where user_id = uid;

  -- Stage alignment
  stage_alignment := case
    when stage = 'ascended' then 100
    when stage = 'initiated' then 80
    when stage = 'pending' then 60
    else 40
  end;

  -- Role alignment
  role_alignment := case
    when role = 'government' then 100
    when role = 'bank' then 90
    when role = 'investor' then 85
    when role = 'supplier' then 75
    when role = 'transporter' then 70
    when role = 'miner' then 65
    when role = 'community' then 60
    else 50
  end;

  -- Historical alignment: density of events in last 60 days
  select least(100, count(*) * 1.5)
  into historical_alignment
  from legitimacy_event_archive
  where user_id = uid
  and created_at > now() - interval '60 days';

  -- Prediction alignment
  select compute_legitimacy_prediction_accuracy(uid)
  into prediction_alignment;

  -- Trust
  select compute_legitimacy_trust_index(uid)
  into trust;

  -- Consistency
  select compute_legitimacy_consistency(uid)
  into consistency;

  -- Anomaly penalty
  select case
    when detect_legitimacy_anomaly(uid)->>'is_anomaly' = 'true' then 100
    else 0
  end
  into anomaly;

  -- Alignment formula
  alignment :=
    (0.20 * stage_alignment) +
    (0.20 * role_alignment) +
    (0.20 * historical_alignment) +
    (0.15 * prediction_alignment) +
    (0.15 * trust) +
    (0.10 * consistency) +
    (0.05 * (100 - anomaly));

  return greatest(0, least(100, alignment));
end;
$$;
