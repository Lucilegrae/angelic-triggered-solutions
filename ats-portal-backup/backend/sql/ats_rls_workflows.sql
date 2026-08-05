-- ============================================================
-- ✦ ATS — WORKFLOW RLS (IDEMPOTENT) ✦
-- ============================================================

-- Ensure workflow_events table exists
create table if not exists workflow_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  stakeholder text not null,
  ministry text,
  event_type text not null,
  event_payload jsonb,
  created_at timestamptz default now()
);

-- Link ministry text to ministries table
alter table workflow_events
  add column if not exists ministry_id uuid;

alter table workflow_events
  add constraint fk_ministry
  foreign key (ministry_id)
  references ministries(id)
  on delete set null;

-- Enable RLS
alter table workflow_events enable row level security;

-- ============================================================
-- Remove old policies if they exist
-- ============================================================
drop policy if exists workflow_read_self on workflow_events;
drop policy if exists workflow_read_government on workflow_events;

-- ============================================================
-- Re-create policies cleanly
-- ============================================================

-- Stakeholders read their own workflow events
create policy workflow_read_self
on workflow_events
for select
using (user_id = auth.uid());

-- Government reads workflow events in their ministry
create policy workflow_read_government
on workflow_events
for select
using (
  auth.jwt()->>'stakeholder' = 'Government'
  and auth.jwt()->>'ministry' = ministry
);

-- Council reads workflow events
drop policy if exists workflow_read_council on workflow_events;

create policy workflow_read_council
on workflow_events
for select
using (
  auth.jwt()->>'stakeholder' = 'Council'
);
