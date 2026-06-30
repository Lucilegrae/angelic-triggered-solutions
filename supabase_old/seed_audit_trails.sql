-- 🌌 Seed Audit Trail Entries
INSERT INTO audit_trails (stakeholder_id, action, status, commentary, signature)
VALUES
  (
    (SELECT id FROM stakeholder_roles WHERE role = 'government' LIMIT 1),
    'affirmed',
    'affirmed',
    'Budget allocation approved for community projects',
    'Minister of Finance'
  ),
  (
    (SELECT id FROM stakeholder_roles WHERE role = 'investor' LIMIT 1),
    'rejected',
    'rejected',
    'Investment terms require revision before approval',
    'Global Capital Partners'
  ),
  (
    (SELECT id FROM stakeholder_roles WHERE role = 'miner' LIMIT 1),
    'affirmed',
    'affirmed',
    'Mining expansion plan aligned with covenant goals',
    'Zimbabwe Mining Syndicate'
  ),
  (
    (SELECT id FROM stakeholder_roles WHERE role = 'community' LIMIT 1),
    'affirmed',
    'affirmed',
    'Community supports the new development initiative',
    'Community Trust Harare'
  );
