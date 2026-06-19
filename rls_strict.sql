-- ============================================================
-- ✦ ATS STRICT RLS — MULTI‑ROLE CEREMONIAL ACCESS CONTROL ✦
-- ============================================================

-- Expected JWT claim:
--   auth.jwt() ->> 'role' IN ('admin','operator','auditor','seer')

-- Helper function for role checking
create or replace function has_role(required text)
returns boolean as $$
  select (auth.jwt() ->> 'role') = required;
$$ language sql stable;

-- ============================================================
-- 1. Institutions (Federation)
-- ============================================================
alter table institutions enable row level security;

-- Read: all authenticated
create policy institutions_read
on institutions for select
to authenticated
using (true);

-- Modify: only admin + operator
create policy institutions_modify
on institutions for all
to authenticated
using (has_role('admin') or has_role('operator'))
with check (has_role('admin') or has_role('operator'));

-- ============================================================
-- 2. Cadence Snapshots (Cosmic Unity)
-- ============================================================
alter table cadence_snapshots enable row level security;

create policy cadence_snapshots_read
on cadence_snapshots for select
to authenticated
using (true);

create policy cadence_snapshots_modify
on cadence_snapshots for all
to authenticated
using (has_role('admin') or has_role('operator'))
with check (has_role('admin') or has_role('operator'));

-- ============================================================
-- 3. Scenarios
-- ============================================================
alter table scenarios enable row level security;

create policy scenarios_read
on scenarios for select
to authenticated
using (true);

create policy scenarios_modify
on scenarios for all
to authenticated
using (has_role('admin') or has_role('operator'))
with check (has_role('admin') or has_role('operator'));

-- ============================================================
-- 4. Cadence Logs (Operator Console)
-- ============================================================
alter table cadence_logs enable row level security;

-- Read: all authenticated
create policy cadence_logs_read
on cadence_logs for select
to authenticated
using (true);

-- Insert: operator + admin
create policy cadence_logs_insert
on cadence_logs for insert
to authenticated
with check (has_role('admin') or has_role('operator'));

-- No updates or deletes allowed
create policy cadence_logs_no_update
on cadence_logs for update
to authenticated
using (false);

create policy cadence_logs_no_delete
on cadence_logs for delete
to authenticated
using (false);

-- ============================================================
-- 5. Certificates
-- ============================================================
alter table certificates enable row level security;

create policy certificates_read
on certificates for select
to authenticated
using (true);

create policy certificates_issue
on certificates for insert
to authenticated
with check (has_role('admin') or has_role('operator'));

-- No updates or deletes
create policy certificates_no_update
on certificates for update
to authenticated
using (false);

create policy certificates_no_delete
on certificates for delete
to authenticated
using (false);

-- ============================================================
-- 6. Audit Logs
-- ============================================================
alter table audit_logs enable row level security;

-- Read: auditors + admin
create policy audit_logs_read
on audit_logs for select
to authenticated
using (has_role('admin') or has_role('auditor'));

-- Insert: system + operator
create policy audit_logs_insert
on audit_logs for insert
to authenticated
with check (has_role('admin') or has_role('operator'));

-- No updates or deletes
create policy audit_logs_no_update
on audit_logs for update
to authenticated
using (false);

create policy audit_logs_no_delete
on audit_logs for delete
to authenticated
using (false);

-- ============================================================
-- 7. Anthology Exports
-- ============================================================
alter table anthology_exports enable row level security;

create policy anthology_exports_read
on anthology_exports for select
to authenticated
using (true);

create policy anthology_exports_insert
on anthology_exports for insert
to authenticated
with check (has_role('admin') or has_role('operator'));

-- No updates or deletes
create policy anthology_exports_no_update
on anthology_exports for update
to authenticated
using (false);

create policy anthology_exports_no_delete
on anthology_exports for delete
to authenticated
using (false);

-- ============================================================
-- 8. Crests (Sanctification)
-- ============================================================
alter table crests enable row level security;

create policy crests_read
on crests for select
to authenticated
using (true);

create policy crests_insert
on crests for insert
to authenticated
with check (has_role('admin') or has_role('seer'));

-- No updates or deletes
create policy crests_no_update
on crests for update
to authenticated
using (false);

create policy crests_no_delete
on crests for delete
to authenticated
using (false);

-- ============================================================
-- 9. Legitimacy Regions (Heatmap)
-- ============================================================
alter table legitimacy_regions enable row level security;

create policy legitimacy_regions_read
on legitimacy_regions for select
to authenticated
using (true);

create policy legitimacy_regions_modify
on legitimacy_regions for all
to authenticated
using (has_role('admin'))
with check (has_role('admin'));

-- ============================================================
-- 10. Resource Flows
-- ============================================================
alter table resource_flows enable row level security;

create policy resource_flows_read
on resource_flows for select
to authenticated
using (true);

create policy resource_flows_modify
on resource_flows for all
to authenticated
using (has_role('admin') or has_role('operator'))
with check (has_role('admin') or has_role('operator'));

-- ============================================================
-- 11. Chronicle Events
-- ============================================================
alter table chronicle_events enable row level security;

create policy chronicle_events_read
on chronicle_events for select
to authenticated
using (true);

create policy chronicle_events_insert
on chronicle_events for insert
to authenticated
with check (has_role('admin') or has_role('seer'));

-- No updates or deletes
create policy chronicle_events_no_update
on chronicle_events for update
to authenticated
using (false);

create policy chronicle_events_no_delete
on chronicle_events for delete
to authenticated
using (false);

-- ============================================================
-- 12. Nexus State
-- ============================================================
alter table nexus_state enable row level security;

create policy nexus_state_read
on nexus_state for select
to authenticated
using (true);

create policy nexus_state_modify
on nexus_state for all
to authenticated
using (has_role('admin'))
with check (has_role('admin'));

