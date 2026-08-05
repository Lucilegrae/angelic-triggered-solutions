INSERT INTO audit_trail (
  entity_type,
  entity_id,
  action,
  actor_role,
  actor_id,
  commentary
) VALUES (
  'council',
  'REAL-UUID-HERE',
  'status_update',
  'golden_star_engine',
  'system',
  'Council status changed to approved'
);
