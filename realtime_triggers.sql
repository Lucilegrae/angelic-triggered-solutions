-- ============================================================
-- ✦ ATS REALTIME TRIGGERS — SYSTEM‑WIDE SYNCHRONIZATION ✦
-- ============================================================

-- ============================================================
-- Helper function: auto-update updated_at
-- ============================================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================================
-- 1. Institutions (Federation)
-- ============================================================
create trigger trg_institutions_updated
before update on institutions
for each row
execute function set_updated_at();

-- ============================================================
-- 2. Cadence Snapshots (Cosmic Unity)
-- ============================================================
create trigger trg_cadence_snapshots_updated
before update on cadence_snapshots
for each row
execute function set_updated_at();

-- ============================================================
-- 3. Scenarios
-- ============================================================
create trigger trg_scenarios_updated
before update on scenarios
for each row
execute function set_updated_at();

-- ============================================================
-- 4. Cadence Logs
-- ============================================================
-- No update trigger (logs are immutable)

-- ============================================================
-- 5. Certificates
-- ============================================================
-- No update trigger (certificates are immutable)

-- ============================================================
-- 6. Audit Logs
-- ============================================================
-- No update trigger (audit logs are immutable)

-- ============================================================
-- 7. Anthology Exports
-- ============================================================
-- No update trigger (exports are immutable)

-- ============================================================
-- 8. Crests (Crest Sanctification)
-- ============================================================
create trigger trg_crests_updated
before update on crests
for each row
execute function set_updated_at();

-- ============================================================
-- 9. Legitimacy Regions (Heatmap)
-- ============================================================
create trigger trg_legitimacy_regions_updated
before update on legitimacy_regions
for each row
execute function set_updated_at();

-- ============================================================
-- 10. Resource Flows
-- ============================================================
create trigger trg_resource_flows_updated
before update on resource_flows
for each row
execute function set_updated_at();

-- ============================================================
-- 11. Chronicle Events
-- ============================================================
-- No update trigger (events are immutable)

-- ============================================================
-- 12. Nexus State
-- ============================================================
create trigger trg_nexus_state_updated
before update on nexus_state
for each row
execute function set_updated_at();

-- ============================================================
-- ✦ MATERIALIZED VIEW REFRESH TRIGGERS ✦
-- ============================================================

-- Federation summary refresh
create or replace function refresh_mv_federation_summary()
returns trigger as $$
begin
  refresh materialized view concurrently mv_federation_summary;
  return null;
end;
$$ language plpgsql;

create trigger trg_refresh_federation_summary
after insert or update or delete on institutions
for each statement
execute function refresh_mv_federation_summary();

-- Latest cadence refresh
create or replace function refresh_mv_latest_cadence()
returns trigger as $$
begin
  refresh materialized view concurrently mv_latest_cadence;
  return null;
end;
$$ language plpgsql;

create trigger trg_refresh_latest_cadence
after insert or update or delete on cadence_snapshots
for each statement
execute function refresh_mv_latest_cadence();

-- Chronicle recent refresh
create or replace function refresh_mv_chronicle_recent()
returns trigger as $$
begin
  refresh materialized view concurrently mv_chronicle_recent;
  return null;
end;
$$ language plpgsql;

create trigger trg_refresh_chronicle_recent
after insert on chronicle_events
for each statement
execute function refresh_mv_chronicle_recent();

