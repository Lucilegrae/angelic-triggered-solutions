WITH ordered_steps AS (
  SELECT
    s.workflow_id,
    w.sector_id,
    s.state,
    s.created_at,
    ROW_NUMBER() OVER (PARTITION BY s.workflow_id ORDER BY s.created_at) AS rn
  FROM ats_workflow_steps s
  JOIN ats_workflows w ON w.id = s.workflow_id
),

transitions AS (
  SELECT
    a.workflow_id,
    a.sector_id AS from_sector,
    b.sector_id AS to_sector
  FROM ordered_steps a
  JOIN ordered_steps b
    ON a.workflow_id = b.workflow_id
   AND a.rn + 1 = b.rn
   AND a.sector_id <> b.sector_id
)

SELECT json_agg(
  json_build_object(
    'from_sector', t.from_sector,
    'to_sector', t.to_sector,
    'count', t.count
  )
)
FROM (
  SELECT
    from_sector,
    to_sector,
    COUNT(*) AS count
  FROM transitions
  GROUP BY from_sector, to_sector
  ORDER BY from_sector, to_sector
) t;
