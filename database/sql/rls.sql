-- ============================================
-- ✦ ATS RLS POLICIES — BASELINE PROTECTION ✦
-- ============================================

-- Enable RLS on all ATS tables
alter table institutions enable row level security;
alter table cadence_snapshots enable row level security;
alter table scenarios enable row level security;
alter table cadence_logs enable row level security;
alter table certificates enable row level security;
alter table audit_logs enable row level security;
alter table anthology_exports enable row level security;
alter table crests enable row level security;
alter table legitimacy_regions enable row level security;
alter table resource_flows enable row level security;
alter table chronicle_events enable row level security;
alter table nexus_state enable row level security;

-- ============================
-- 1. Institutions
-- ============================
create policy institutions_select_all
on institutions
for select
to authenticated
using (true);

create policy institutions_modify_all
on institutions
for all
to authenticated
using (true)
with check (true);

-- ============================
-- 2. Cadence Snapshots
-- ============================
create policy cadence_snapshots_select_all
on cadence_snapshots
for select
to authenticated
using (true);

create policy cadence_snapshots_modify_all
on cadence_snapshots
for all
to authenticated
using (true)
with check (true);

-- ============================
-- 3. Scenarios
-- ============================
create policy scenarios_select_all
on scenarios
for select
to authenticated
using (true);

create policy scenarios_modify_all
on scenarios
for all
to authenticated
using (true)
with check (true);

-- ============================
-- 4. Cadence Logs
-- ============================
create policy cadence_logs_select_all
on cadence_logs
for select
to authenticated
using (true);

create policy cadence_logs_insert_all
on cadence_logs
for insert
to authenticated
with check (true);

-- ============================
-- 5. Certificates
-- ============================
create policy certificates_select_all
on certificates
for select
to authenticated
using (true);

create policy certificates_modify_all
on certificates
for all
to authenticated
using (true)
with check (true);

-- ============================
-- 6. Audit Logs
-- ============================
create policy audit_logs_select_all
on audit_logs
for select
to authenticated
using (true);

create policy audit_logs_insert_all
on audit_logs
for insert
to authenticated
with check (true);

-- ============================
-- 7. Anthology Exports
-- ============================
create policy anthology_exports_select_all
on anthology_exports
for select
to authenticated
using (true);

create policy anthology_exports_insert_all
on anthology_exports
for insert
to authenticated
with check (true);

-- ============================
-- 8. Crests
-- ============================
create policy crests_select_all
on crests
for select
to authenticated
using (true);

create policy crests_insert_all
on crests
for insert
to authenticated
with check (true);

-- ============================
-- 9. Legitimacy Regions
-- ============================
create policy legitimacy_regions_select_all
on legitimacy_regions
for select
to authenticated
using (true);

create policy legitimacy_regions_modify_all
on legitimacy_regions
for all
to authenticated
using (true)
with check (true);

-- ============================
-- 10. Resource Flows
-- ============================
create policy resource_flows_select_all
on resource_flows
for select
to authenticated
using (true);

create policy resource_flows_modify_all
on resource_flows
for all
to authenticated
using (true)
with check (true);

-- ============================
-- 11. Chronicle Events
-- ============================
create policy chronicle_events_select_all
on chronicle_events
for select
to authenticated
using (true);

create policy chronicle_events_insert_all
on chronicle_events
for insert
to authenticated
with check (true);

-- ============================
-- 12. Nexus State
-- ============================
create policy nexus_state_select_all
on nexus_state
for select
to authenticated
using (true);

create policy nexus_state_modify_all
on nexus_state
for all
to authenticated
using (true)
with check (true);

