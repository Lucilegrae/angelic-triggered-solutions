WITH ages AS (
  SELECT
    w.id AS workflow_id,
    w.sector_id,
    EXTRACT(EPOCH FROM (
      (SELECT MAX(created_at) FROM ats_workflow_steps s WHERE s.workflow_id = w.id)
      - w.created_at
    )) / 3600 AS age_hours
  FROM ats_workflows w
)

SELECT json_build_object(
  'timestamp', now(),
  'warning', (
    SELECT json_agg(json_build_object('workflow_id', a.workflow_id, 'sector_id', a.sector_id, 'age_hours', a.age_hours))
    FROM ages a WHERE a.age_hours BETWEEN 24 AND 48
  ),
  'breach', (
    SELECT json_agg(json_build_object('workflow_id', a.workflow_id, 'sector_id', a.sector_id, 'age_hours', a.age_hours))
    FROM ages a WHERE a.age_hours > 48
  ),
  'critical', (
    SELECT json_agg(json_build_object('workflow_id', a.workflow_id, 'sector_id', a.sector_id, 'age_hours', a.age_hours))
    FROM ages a WHERE a.age_hours > 72
  )
);
