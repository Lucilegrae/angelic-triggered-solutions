create or replace function detect_legitimacy_anomaly(uid uuid)
returns jsonb
language plpgsql
as $$
declare
  actual numeric;
  predicted numeric;
  anomaly numeric;
  role text;
  threshold numeric;
  is_anomaly boolean;
begin
  -- Fetch role
  select role into role
  from legitimacy
  where user_id = uid;

  -- Fetch actual legitimacy score
  select compute_legitimacy_score(uid)
  into actual;

  -- Fetch predicted legitimacy score
  select predict_legitimacy(uid)
  into predicted;

  -- Compute anomaly
  anomaly := abs(actual - predicted);

  -- Role-aware threshold
  threshold := case
    when role = 'community' then 12
    when role = 'miner' then 15
    when role = 'bank' then 10
    when role = 'investor' then 18
    when role = 'government' then 8
    when role = 'supplier' then 14
    when role = 'transporter' then 16
    when role = 'donor' then 10
    else 12
  end;

  is_anomaly := anomaly > threshold;

  return jsonb_build_object(
    'actual', actual,
    'predicted', predicted,
    'difference', anomaly,
    'threshold', threshold,
    'is_anomaly', is_anomaly
  );
end;
$$;
