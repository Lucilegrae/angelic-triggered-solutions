-- ============================================================
-- ✦ ATS — PERMISSION RLS ✦
-- ============================================================

-- Enforce can_apply on applications
create policy enforce_can_apply
on applications
for insert
with check (
  (auth.jwt()->'permissions'->>'can_apply')::boolean = true
);

-- Enforce can_review on projects
create policy enforce_can_review_projects
on projects
for select
using (
  (auth.jwt()->'permissions'->>'can_review')::boolean = true
);

-- Enforce can_review on donations
create policy enforce_can_review_donations
on donations
for select
using (
  (auth.jwt()->'permissions'->>'can_review')::boolean = true
);

-- Enforce can_review on investments
create policy enforce_can_review_investments
on investments
for select
using (
  (auth.jwt()->'permissions'->>'can_review')::boolean = true
);
