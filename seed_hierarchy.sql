-- Seed canonical institutions
INSERT INTO institutions (institution_id, name, sector, status) VALUES
  (gen_random_uuid(), 'CBZ Bank Ltd', 'Banking', 'Active'),
  (gen_random_uuid(), 'NMB Bank Ltd', 'Banking', 'Active'),
  (gen_random_uuid(), 'Zimnat Life Assurance', 'Insurance', 'Active'),
  (gen_random_uuid(), 'Econet Life / EcoSure', 'Telecoms', 'Active'),
  (gen_random_uuid(), 'Microfinance Zimbabwe Ltd', 'Microfinance', 'Active'),
  (gen_random_uuid(), 'Mutapa Investment Fund', 'Fund', 'Active'),
  (gen_random_uuid(), 'Development Bank of Zimbabwe', 'Development Finance', 'Active');

-- Seed KPIs linked to institutions
INSERT INTO kpis (kpi_id, institution_id, name, unit) VALUES
  (gen_random_uuid(), (SELECT institution_id FROM institutions WHERE name='CBZ Bank Ltd'), 'Total Assets', 'USD'),
  (gen_random_uuid(), (SELECT institution_id FROM institutions WHERE name='NMB Bank Ltd'), 'Net Profit', 'USD'),
  (gen_random_uuid(), (SELECT institution_id FROM institutions WHERE name='Zimnat Life Assurance'), 'Claims Ratio', '%'),
  (gen_random_uuid(), (SELECT institution_id FROM institutions WHERE name='Econet Life / EcoSure'), 'Subscribers', 'count'),
  (gen_random_uuid(), (SELECT institution_id FROM institutions WHERE name='Microfinance Zimbabwe Ltd'), 'Loan Portfolio', 'USD'),
  (gen_random_uuid(), (SELECT institution_id FROM institutions WHERE name='Mutapa Investment Fund'), 'Fund Value', 'USD'),
  (gen_random_uuid(), (SELECT institution_id FROM institutions WHERE name='Development Bank of Zimbabwe'), 'Projects Financed', 'count');

-- Seed production records linked to KPIs
INSERT INTO production_records (record_id, kpi_id, period, value) VALUES
  (gen_random_uuid(), (SELECT kpi_id FROM kpis WHERE name='Total Assets'), '2026-Q1', 500000000),
  (gen_random_uuid(), (SELECT kpi_id FROM kpis WHERE name='Net Profit'), '2026-Q1', 12000000),
  (gen_random_uuid(), (SELECT kpi_id FROM kpis WHERE name='Claims Ratio'), '2026-Q1', 65),
  (gen_random_uuid(), (SELECT kpi_id FROM kpis WHERE name='Subscribers'), '2026-Q1', 2000000),
  (gen_random_uuid(), (SELECT kpi_id FROM kpis WHERE name='Loan Portfolio'), '2026-Q1', 15000000),
  (gen_random_uuid(), (SELECT kpi_id FROM kpis WHERE name='Fund Value'), '2026-Q1', 750000000),
  (gen_random_uuid(), (SELECT kpi_id FROM kpis WHERE name='Projects Financed'), '2026-Q1', 42);
