-- ============================================================
-- ✦ ATS — MINISTRY REGISTRY TABLE ✦
-- ============================================================

create table if not exists ministries (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  description text,
  category text,
  jurisdiction text,
  color text default '#0066CC',
  created_at timestamptz default now()
);

-- Seed ministries (idempotent)
insert into ministries (name, description, category, jurisdiction, color)
values
  ('Agriculture', 'Food security, crops, livestock', 'Economic', 'National', '#4CAF50'),
  ('Mines', 'Mining, minerals, extraction oversight', 'Economic', 'National', '#795548'),
  ('Transport', 'Roads, logistics, mobility', 'Infrastructure', 'National', '#2196F3'),
  ('Finance', 'Treasury, payments, taxation', 'Economic', 'National', '#9C27B0'),
  ('Local Government', 'Councils, municipalities, districts', 'Governance', 'Local', '#FF9800'),
  ('Environment', 'Forestry, climate, conservation', 'Sustainability', 'National', '#8BC34A'),
  ('Energy', 'Electricity, fuel, renewables', 'Infrastructure', 'National', '#FFC107'),
  ('ICT', 'Digital systems, telecoms, identity', 'Technology', 'National', '#00BCD4'),
  ('Water', 'Dams, boreholes, sanitation', 'Infrastructure', 'National', '#03A9F4'),
  ('Health', 'Clinics, hospitals, public health', 'Social', 'National', '#E91E63'),
  ('Education', 'Schools, colleges, training', 'Social', 'National', '#3F51B5')
on conflict (name) do nothing;
