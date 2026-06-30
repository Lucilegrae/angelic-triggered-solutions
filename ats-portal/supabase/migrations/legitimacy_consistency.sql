create or replace function compute_legitimacy_consistency(uid uuid)
returns numeric
language plpgsql
as $$
declare
  gaps numeric[];
  avg_gap numeric;
  std_gap numeric;
  consistency numeric;
begin
  -- Collect time gaps between legitimacy events
  select array_agg(extract(epoch from (timestamp - lag(timestamp) over (order by timestamp))) / 86400)
  into gaps
  from legitimacy_events
  where user_id = uid;

  -- If fewer than 2 events, consistency is neutral
  if gaps is null or array_length(gaps, 1) < 2 then
    return 50;
  end if;

  -- Average gap
  select avg(g) into avg_gap from unnest(gaps) g;

  -- Standard deviation of gaps
  select stddev(g) into std_gap from unnest(gaps) g;

  -- Consistency formula
  consistency := 1 - (avg_gap / 90) - (std_gap / 120);

  -- Clamp between 0 and 1
  consistency := greatest(0, least(1, consistency));

  return consistency * 100;
end;
$$;
