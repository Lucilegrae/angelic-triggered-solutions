-- ============================================================
-- ✦ ATS — AUDIT LOGS + CERTIFICATE RLS ✦
-- ============================================================

alter table legitimacy_audit enable row level security;
alter table certificates enable row level security;

-- ============================================================
-- Community + CommunityMember
-- ============================================================
create policy audit_read_community
on legitimacy_audit
for select
using (
  auth.jwt()->>'stakeholder' in ('Community', 'CommunityMember')
  and user_id = auth.uid()
);

-- ============================================================
-- Miner
-- ============================================================
create policy audit_read_miner
on legitimacy_audit
for select
using (
  auth.jwt()->>'stakeholder' = 'Miner'
  and user_id = auth.uid()
);

-- ============================================================
-- Supplier
-- ============================================================
create policy audit_read_supplier
on legitimacy_audit
for select
using (
  auth.jwt()->>'stakeholder' = 'Supplier'
  and user_id = auth.uid()
);

-- ============================================================
-- Insurance
-- ============================================================
create policy audit_read_insurance
on legitimacy_audit
for select
using (
  auth.jwt()->>'stakeholder' = 'Insurance'
);

-- ============================================================
-- Bank
-- ============================================================
create policy audit_read_bank
on legitimacy_audit
for select
using (
  auth.jwt()->>'stakeholder' = 'Bank'
);

-- ============================================================
-- Government (Ministry-aware)
-- ============================================================
create policy audit_read_government
on legitimacy_audit
for select
using (
  auth.jwt()->>'stakeholder' = 'Government'
  and auth.jwt()->>'ministry' = role
);

-- ============================================================
-- Transporter
-- ============================================================
create policy audit_read_transporter
on legitimacy_audit
for select
using (
  auth.jwt()->>'stakeholder' = 'Transporter'
);

-- ============================================================
-- Landowner
-- ============================================================
create policy audit_read_landowner
on legitimacy_audit
for select
using (
  auth.jwt()->>'stakeholder' = 'Landowner'
);

-- ============================================================
-- Donor
-- ============================================================
create policy audit_read_donor
on legitimacy_audit
for select
using (
  auth.jwt()->>'stakeholder' = 'Donor'
);

-- ============================================================
-- Investor
-- ============================================================
create policy audit_read_investor
on legitimacy_audit
for select
using (
  auth.jwt()->>'stakeholder' = 'Investor'
);

-- ============================================================
-- ✦ CERTIFICATE RLS ✦
-- ============================================================

-- Everyone reads their own certificates
create policy certificate_read_self
on certificates
for select
using (
  user_id = auth.uid()
);

-- Government reads certificates in their ministry
create policy certificate_read_government
on certificates
for select
using (
  auth.jwt()->>'stakeholder' = 'Government'
  and auth.jwt()->>'ministry' = ministry
);

-- Certificate issuance (Insurance, Government, Bank)
create policy certificate_issue
on certificates
for insert
with check (
  (
    auth.jwt()->>'stakeholder' = 'Insurance'
    and (auth.jwt()->'permissions'->>'can_insure')::boolean
  )
  or
  (
    auth.jwt()->>'stakeholder' = 'Government'
    and (auth.jwt()->'permissions'->>'can_approve')::boolean
  )
  or
  (
    auth.jwt()->>'stakeholder' = 'Bank'
    and (auth.jwt()->'permissions'->>'can_fund')::boolean
  )
);
