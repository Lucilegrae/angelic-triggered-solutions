create or replace function handle_legitimacy_event()
returns trigger
language plpgsql
as $$
begin
  perform archive_legitimacy_event(
    new.user_id,
    new.role,
    new.stage,
    new.progress,
    new.source,
    new.anomaly
  );
  return new;
end;
$$;

create trigger archive_legitimacy_event_trigger
after insert on legitimacy_events
for each row execute procedure handle_legitimacy_event();
