-- Institutions table (UUID PK, sector constraint expanded)
CREATE TABLE IF NOT EXISTS institutions (
  institution_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  sector TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Drop and recreate sector constraint to expand allowed values
ALTER TABLE institutions DROP CONSTRAINT IF EXISTS institutions_sector_check;

ALTER TABLE institutions ADD CONSTRAINT institutions_sector_check
  CHECK (sector IN (
    'Banking',
    'Insurance',
    'Fund',
    'Development Finance',
    'Microfinance',
    'Telecommunications'
  ));

-- KPIs table
CREATE TABLE IF NOT EXISTS kpis (
  id SERIAL PRIMARY KEY,
  institution_id UUID REFERENCES institutions(institution_id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  metric_value NUMERIC,
  recorded_at TIMESTAMP DEFAULT NOW()
);

-- AuditTrail table
CREATE TABLE IF NOT EXISTS audit_trail (
  id SERIAL PRIMARY KEY,
  stakeholder TEXT,
  action TEXT NOT NULL,
  commentary TEXT,
  affirmed BOOLEAN DEFAULT FALSE,
  rejected BOOLEAN DEFAULT FALSE,
  signed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed demo institutions safely
INSERT INTO institutions (name, sector) VALUES
  ('CBZ Bank Ltd', 'Banking'),
  ('Econet Wireless', 'Telecommunications'),
  ('Old Mutual Zimbabwe', 'Insurance'),
  ('ZB Financial Holdings', 'Banking')
ON CONFLICT (name) DO NOTHING;

-- Seed demo KPIs (replace <uuid> placeholders after lookup)
-- Run: SELECT institution_id, name FROM institutions;
INSERT INTO kpis (institution_id, metric_name, metric_value) VALUES
  ('<uuid-of-CBZ>', 'Total Assets', 1200000000),
  ('<uuid-of-CBZ>', 'Net Profit', 45000000),
  ('<uuid-of-Econet>', 'Subscribers', 12000000),
  ('<uuid-of-OldMutual>', 'Policies Issued', 500000),
  ('<uuid-of-ZB>', 'Loans Disbursed', 750000)
ON CONFLICT DO NOTHING;

-- Seed demo audit trail entries safely
INSERT INTO audit_trail (stakeholder, action, commentary, affirmed, signed) VALUES
  ('Government Regulator', 'Reviewed KPI submission', 'All metrics verified', TRUE, TRUE),
  ('Investor', 'Requested financial projection', 'Scenario-based model delivered', TRUE, FALSE),
  ('Community Board', 'Rejected pricing model', 'Concerns about affordability', FALSE, TRUE)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_trail ENABLE ROW LEVEL SECURITY;

-- Create roles if missing
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'regulator') THEN
    CREATE ROLE regulator NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'investor') THEN
    CREATE ROLE investor NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'community_board') THEN
    CREATE ROLE community_board NOLOGIN;
  END IF;
END
$$;

-- Policies for Institutions
CREATE POLICY regulator_institutions_policy
ON institutions FOR SELECT TO regulator USING (true);

CREATE POLICY investor_institutions_policy
ON institutions FOR SELECT TO investor USING (sector = 'Banking');

CREATE POLICY community_institutions_policy
ON institutions FOR SELECT TO community_board USING (sector <> 'Banking');

-- Policies for KPIs
CREATE POLICY regulator_kpis_policy
ON kpis FOR SELECT TO regulator USING (true);

CREATE POLICY investor_kpis_policy
ON kpis FOR SELECT TO investor USING (metric_name IN ('Total Assets','Net Profit'));

CREATE POLICY community_kpis_policy
ON kpis FOR SELECT TO community_board USING (metric_name NOT IN ('Total Assets','Net Profit'));

-- Policies for AuditTrail
CREATE POLICY regulator_audit_policy
ON audit_trail FOR SELECT TO regulator USING (stakeholder = 'Government Regulator');

CREATE POLICY investor_audit_policy
ON audit_trail FOR SELECT TO investor USING (stakeholder = 'Investor');

CREATE POLICY community_audit_policy
ON audit_trail FOR SELECT TO community_board USING (stakeholder = 'Community Board');
