create or replace function compute_legitimacy_trust_index(uid uuid)
returns numeric
language plpgsql
as $$
declare
  consistency numeric;
  anomaly numeric;
  prediction numeric;
  density numeric;
  stage_score numeric;
  mou_signed boolean;
  trust numeric;
begin
  -- Consistency
  select compute_legitimacy_consistency(uid)
  into consistency;

  -- Anomaly (0–100 penalty)
  select case
    when detect_legitimacy_anomaly(uid)->>'is_anomaly' = 'true' then 100
    else 0
  end
  into anomaly;

  -- Prediction accuracy (0–100)
  select compute_legitimacy_prediction_accuracy(uid)
  into prediction;

  -- Archive density (events per 30 days)
  select least(100, count(*) * 3)
  into density
  from legitimacy_event_archive
  where user_id = uid
  and created_at > now() - interval '30 days';

  -- Stage progression score
  select case
    when stage = 'ascended' then 100
    when stage = 'initiated' then 70
    when stage = 'pending' then 40
    else 20
  end
  into stage_score
  from legitimacy
  where user_id = uid;

  -- MoU multiplier
  select signed into mou_signed
  from onboarding_mou
  where user_id = uid;

  -- Trust Index formula
  trust :=
    (0.30 * consistency) +
    (0.20 * prediction) +
    (0.20 * density) +
    (0.20 * stage_score) +
    (0.10 * (100 - anomaly));

  if mou_signed then
    trust := trust * 1.0;
  else
    trust := trust * 0.7;
  end if;

  return greatest(0, least(100, trust));
end;
$$;
