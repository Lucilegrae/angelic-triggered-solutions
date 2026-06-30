select cron.schedule(
  'nightly_legitimacy_archive',
  '0 2 * * *',
  $$ insert into legitimacy_event_archive
     select *
     from legitimacy_events
     where created_at::date = current_date - 1; $$
);
