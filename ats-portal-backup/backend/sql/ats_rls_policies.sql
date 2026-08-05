-- ============================================================
-- ✦ ATS — MULTI‑STAKEHOLDER RLS SECURITY LAYER ✦
-- ============================================================

-- Enable RLS on all core tables
alter table applications enable row level security;
alter table projects enable row level security;
alter table land_transactions enable row level security;
alter table donations enable row level security;
alter table investments enable row level security;
alter table logistics enable row level security;

-- ============================================================
-- 🟦 Community
-- ============================================================
create policy community_read
on applications
for select
using (auth.jwt()->>'stakeholder' = 'Community');

create policy community_apply
on applications
for insert
using (auth.jwt()->>'stakeholder' = 'Community'
       and (auth.jwt()->'permissions'->>'can_apply')::boolean);

-- ============================================================
-- 🟩 Community Member
-- ============================================================
create policy community_member_read
on applications
for select
using (auth.jwt()->>'stakeholder' = 'CommunityMember');

create policy community_member_apply
on applications
for insert
using (auth.jwt()->>'stakeholder' = 'CommunityMember'
       and (auth.jwt()->'permissions'->>'can_apply')::boolean);

-- ============================================================
-- 🟧 Miner
-- ============================================================
create policy miner_read_projects
on projects
for select
using (auth.jwt()->>'stakeholder' = 'Miner');

create policy miner_insurance
on insurance_claims
for insert
using (auth.jwt()->>'stakeholder' = 'Miner'
       and (auth.jwt()->'permissions'->>'can_insure')::boolean);

create policy miner_funding
on funding_requests
for insert
using (auth.jwt()->>'stakeholder' = 'Miner'
       and (auth.jwt()->'permissions'->>'can_fund')::boolean);

-- ============================================================
-- 🟥 Supplier
-- ============================================================
create policy supplier_supply
on logistics
for insert
using (auth.jwt()->>'stakeholder' = 'Supplier'
       and (auth.jwt()->'permissions'->>'can_supply')::boolean);

-- ============================================================
-- 🟪 Insurance
-- ============================================================
create policy insurance_underwrite
on insurance_claims
for update
using (auth.jwt()->>'stakeholder' = 'Insurance'
       and (auth.jwt()->'permissions'->>'can_insure')::boolean);

-- ============================================================
-- 🟫 Bank
-- ============================================================
create policy bank_funding
on funding_requests
for update
using (auth.jwt()->>'stakeholder' = 'Bank'
       and (auth.jwt()->'permissions'->>'can_fund')::boolean);

-- ============================================================
-- 🟨 Government (Ministry‑aware)
-- ============================================================
create policy government_review
on projects
for select
using (
  auth.jwt()->>'stakeholder' = 'Government'
  and auth.jwt()->>'ministry' = sector
);

create policy government_approve
on projects
for update
using (
  auth.jwt()->>'stakeholder' = 'Government'
  and (auth.jwt()->'permissions'->>'can_approve')::boolean
);

-- ============================================================
-- 🟦 Transporter
-- ============================================================
create policy transporter_logistics
on logistics
for update
using (auth.jwt()->>'stakeholder' = 'Transporter'
       and (auth.jwt()->'permissions'->>'can_transport')::boolean);

-- ============================================================
-- 🟩 Landowner
-- ============================================================
create policy landowner_allocate
on land_transactions
for insert
using (auth.jwt()->>'stakeholder' = 'Landowner'
       and (auth.jwt()->'permissions'->>'can_allocate_land')::boolean);

create policy landowner_sell
on land_transactions
for update
using (auth.jwt()->>'stakeholder' = 'Landowner'
       and (auth.jwt()->'permissions'->>'can_sell_land')::boolean);

create policy landowner_compensate
on land_transactions
for update
using (auth.jwt()->>'stakeholder' = 'Landowner'
       and (auth.jwt()->'permissions'->>'can_compensate_land')::boolean);

-- ============================================================
-- 🟧 Donor
-- ============================================================
create policy donor_donate
on donations
for insert
using (auth.jwt()->>'stakeholder' = 'Donor'
       and (auth.jwt()->'permissions'->>'can_donate')::boolean);

create policy donor_sponsor
on donations
for update
using (auth.jwt()->>'stakeholder' = 'Donor'
       and (auth.jwt()->'permissions'->>'can_sponsor')::boolean);

-- ============================================================
-- 🟥 Investor
-- ============================================================
create policy investor_invest
on investments
for insert
using (auth.jwt()->>'stakeholder' = 'Investor'
       and (auth.jwt()->'permissions'->>'can_invest')::boolean);

create policy investor_commit
on investments
for update
using (auth.jwt()->>'stakeholder' = 'Investor'
       and (auth.jwt()->'permissions'->>'can_commit_capital')::boolean);
