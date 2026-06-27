-- ============================================================
-- ✦ ATS DEMO DATA SEED — FULL SYSTEM ACTIVATION ✦
-- ============================================================

-- ============================
-- 1. Institutions (Federation)
-- ============================
insert into institutions (name, legitimacy_score) values
('Angelic Triggered Solutions HQ', 0.92),
('Celestial Compliance Bureau', 0.88),
('Order of the Golden Seal', 0.95),
('Harmonic Oversight Council', 0.81);

-- ============================
-- 2. Cadence Snapshots (Cosmic Unity)
-- ============================
insert into cadence_snapshots (cadence, value) values
('daily', 0.91),
('weekly', 0.87),
('monthly', 0.93),
('ritual', 0.97);

-- ============================
-- 3. Scenarios (Scenario Overlay)
-- ============================
insert into scenarios (name, impact) values
('Baseline', 'neutral'),
('Optimistic', 'high positive'),
('Stabilization', 'moderate positive'),
('Emergency Response', 'critical');

-- ============================
-- 4. Cadence Logs (Operator Console)
-- ============================
insert into cadence_logs (cadence_type, status, message) values
('daily', 'completed', 'Daily cadence executed successfully'),
('weekly', 'queued', 'Weekly cadence scheduled'),
('ritual', 'completed', 'Ritual cadence harmonized'),
('monthly', 'failed', 'Monthly cadence encountered anomaly');

-- ============================
-- 5. Certificates (Issuance Panel)
-- ============================
insert into certificates (recipient, reason) values
('Prince Masvikepi', 'Excellence in System Architecture'),
('Lucius Lecrae Grae', 'Quantum Ritual Coordination'),
('Aurelia Vesper', 'Cosmic Unity Calibration'),
('Tavian Sol', 'Federation Oversight Merit');

-- ============================
-- 6. Audit Logs (Audit Trail Explorer)
-- ============================
insert into audit_logs (actor, action, details) values
('system', 'initial_bootstrap', '{"status":"ok"}'),
('operator', 'triggered_daily_cadence', '{"cadence":"daily"}'),
('seer', 'crest_sanctified', '{"aura":"gold"}'),
('auditor', 'reviewed_exports', '{"count":4}');

-- ============================
-- 7. Anthology Exports
-- ============================
insert into anthology_exports (format) values
('json'),
('csv'),
('pdf'),
('xml');

-- ============================
-- 8. Crests (Crest Sanctification)
-- ============================
insert into crests (aura) values
('gold'),
('violet'),
('blue'),
('emerald');

-- ============================
-- 9. Legitimacy Regions (Heatmap)
-- ============================
insert into legitimacy_regions (region_name, legitimacy) values
('North Quadrant', 0.91),
('South Quadrant', 0.73),
('East Quadrant', 0.84),
('West Quadrant', 0.66);

-- ============================
-- 10. Resource Flows
-- ============================
insert into resource_flows (source, target, amount) values
('ATS Treasury', 'Community Outreach', 12000.50),
('Celestial Bank', 'Ritual Operations', 8500.00),
('Oversight Council', 'Audit Division', 4300.75),
('Golden Seal Order', 'Sanctification Chamber', 6200.20);

-- ============================
-- 11. Chronicle Events
-- ============================
insert into chronicle_events (title, description) values
('System Initialized', 'ATS core engine activated'),
('First Cadence', 'Daily cadence executed successfully'),
('Crest Sanctified', 'Golden aura crest applied'),
('Federation Sync', 'Institutions synchronized with nexus');

-- ============================
-- 12. Nexus State
-- ============================
insert into nexus_state (integrated_panels, status) values
(12, 'operational');

