create or replace function predict_legitimacy(uid uuid)
returns numeric
language plpgsql
as $$
declare
  current_score numeric;
  previous_score numeric;
  momentum numeric;
  predicted numeric;
begin
  -- Current legitimacy score
  select compute_legitimacy_score(uid)
  into current_score;

  -- Previous legitimacy score (from audit)
  select compute_legitimacy_score(uid)
  from legitimacy_audit
  where user_id = uid
  order by timestamp desc
  offset 1 limit 1
  into previous_score;

  if previous_score is null then
    previous_score := current_score;
  end if;

  -- Momentum
  momentum := current_score - previous_score;

  -- Prediction
  predicted := current_score + (momentum * 0.5);

  return greatest(0, least(predicted, 100));
end;
$$;
