-- ============================================================
-- ✦ ATS PERFORMANCE TUNING & INDEX SUITE ✦
-- ============================================================

-- ============================
-- 1. Institutions
-- ============================
create index if not exists idx_institutions_legitimacy
  on institutions (legitimacy_score);

create index if not exists idx_institutions_name
  on institutions (name);

-- ============================
-- 2. Cadence Snapshots
-- ============================
create index if not exists idx_cadence_snapshots_cadence
  on cadence_snapshots (cadence);

create index if not exists idx_cadence_snapshots_captured
  on cadence_snapshots (captured_at desc);

-- ============================
-- 3. Scenarios
-- ============================
create index if not exists idx_scenarios_name
  on scenarios (name);

-- ============================
-- 4. Cadence Logs
-- ============================
create index if not exists idx_cadence_logs_type
  on cadence_logs (cadence_type);

create index if not exists idx_cadence_logs_created
  on cadence_logs (created_at desc);

-- ============================
-- 5. Certificates
-- ============================
create index if not exists idx_certificates_recipient
  on certificates (recipient);

create index if not exists idx_certificates_issued
  on certificates (issued_at desc);

-- ============================
-- 6. Audit Logs
-- ============================
create index if not exists idx_audit_logs_actor
  on audit_logs (actor);

create index if not exists idx_audit_logs_timestamp
  on audit_logs (timestamp desc);

create index if not exists idx_audit_logs_details_gin
  on audit_logs using gin (details);

-- ============================
-- 7. Anthology Exports
-- ============================
create index if not exists idx_anthology_exports_format
  on anthology_exports (format);

create index if not exists idx_anthology_exports_time
  on anthology_exports (exported_at desc);

-- ============================
-- 8. Crests
-- ============================
create index if not exists idx_crests_aura
  on crests (aura);

create index if not exists idx_crests_time
  on crests (sanctified_at desc);

-- ============================
-- 9. Legitimacy Regions
-- ============================
create index if not exists idx_legitimacy_regions_name
  on legitimacy_regions (region_name);

create index if not exists idx_legitimacy_regions_value
  on legitimacy_regions (legitimacy);

-- ============================
-- 10. Resource Flows
-- ============================
create index if not exists idx_resource_flows_source
  on resource_flows (source);

create index if not exists idx_resource_flows_target
  on resource_flows (target);

create index if not exists idx_resource_flows_amount
  on resource_flows (amount);

create index if not exists idx_resource_flows_created
  on resource_flows (created_at desc);

-- ============================
-- 11. Chronicle Events
-- ============================
create index if not exists idx_chronicle_events_title
  on chronicle_events (title);

create index if not exists idx_chronicle_events_timestamp
  on chronicle_events (timestamp desc);

-- ============================
-- 12. Nexus State
-- ============================
create index if not exists idx_nexus_state_status
  on nexus_state (status);

create index if not exists idx_nexus_state_updated
  on nexus_state (updated_at desc);

-- ============================================================
-- ✦ MATERIALIZED VIEWS FOR DASHBOARD SPEED ✦
-- ============================================================

-- Federation legitimacy summary
create materialized view if not exists mv_federation_summary as
select
  count(*) as institution_count,
  avg(legitimacy_score) as avg_legitimacy,
  max(legitimacy_score) as max_legitimacy,
  min(legitimacy_score) as min_legitimacy
from institutions;

create index if not exists idx_mv_federation_summary_avg
  on mv_federation_summary (avg_legitimacy);

-- Cadence snapshot latest values
create materialized view if not exists mv_latest_cadence as
select distinct on (cadence)
  cadence,
  value,
  captured_at
from cadence_snapshots
order by cadence, captured_at desc;

create index if not exists idx_mv_latest_cadence
  on mv_latest_cadence (cadence);

-- Chronicle timeline fast view
create materialized view if not exists mv_chronicle_recent as
select *
from chronicle_events
order by timestamp desc
limit 100;

-- ============================================================
-- ✦ PERFORMANCE TUNING HINTS ✦
-- ============================================================

-- Analyze tables for query planner optimization
analyze institutions;
analyze cadence_snapshots;
analyze scenarios;
analyze cadence_logs;
analyze certificates;
analyze audit_logs;
analyze anthology_exports;
analyze crests;
analyze legitimacy_regions;
analyze resource_flows;
analyze chronicle_events;
analyze nexus_state;

